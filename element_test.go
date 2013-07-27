package main

import (
	"testing"
)

func TestGenerateGraph(t *testing.T) {
	buf := []byte("https://chart.googleapis.com/chart?cht=gv&chl=digraph{")

	for i := range elements {
		for _, l := range elements[i].Links {
			buf = append(append(append(append(buf, ' '), elements[i].Name...), "->"...), elements[l].Name...)
		}
	}

	t.Log(string(append(buf, " }"...)))
}

func TestElements(t *testing.T) {
	for i := Element(0); i < elementCount; i++ {
		var name string
		if len(elements[i].Name) == 0 {
			t.Errorf("elements[%d] has no name", i)
		} else {
			name = " (" + elements[i].Name + ")"
		}
		if i == Chaotic {
			if len(elements[i].Links) != 0 {
				t.Errorf("elements[%d]%s has explicit links (Chaotic)", i, name)
			}
		} else if len(elements[i].Links) == 0 {
			t.Errorf("elements[%d]%s has no links", i, name)
		}
		for _, l := range elements[i].Links {
			if l == i {
				t.Errorf("elements[%d]%s has a link to itself", i, name)
			}
			if l == Nature {
				t.Errorf("elements[%d]%s has an explicit link to Nature", i, name)
			}
			if l >= elementCount {
				t.Errorf("elements[%d]%s has an invalid link", i, name)
			}
		}
		for j := i + 1; j < elementCount; j++ {
			if elements[i].Name == elements[j].Name && name != "" {
				t.Errorf("elements[%d]%s is named the same thing as elements[%d]", i, name, j)
			}
		}
	}
}

func TestWeaknesses(t *testing.T) {
	seen := make(map[Element]bool, elementCount)
	seen[Nature] = true
	seen[Chaotic] = true

	x := Air
	for {
		y, ok := weakness[x]
		if !ok {
			t.Fatalf("Element %v has no weakness", x)
		}
		if seen[y] {
			t.Fatalf("Element %v is used by multiple weaknesses", y)
		}
		seen[y] = true
		if y == Air {
			break
		}
		x = y
	}

	for i := Element(0); i < elementCount; i++ {
		if !seen[i] {
			t.Errorf("Element %v does not have a weakness in the loop", i)
		}
	}
}