# GenExVar

# Branch naming convention dla projektu

## Gałązie robocze

* `issue/nazwa_zadania` - gałąź do pracy nad zadaniem o numerze `issue` i nazwie `nazwa_zadania`. Nazwa powinna być jednoznaczna i opisywać, co jest przedmiotem zadania.

## Gałązie produkcyjne

* `develop` - gałąź, na którą mergowane są gałęzie robocze, aby przygotować się do wydania.
* `release/1.0.0` - gałąź, na której tworzony jest release o numerze `1.0.0`.
* `main` - gałąź produkcyjna, na którą mergowane są gałęzie release.

## Przykłady

* `issue/1234/dodanie_nowej_funkcji` - gałąź do pracy nad zadaniem o numerze 1234 o nazwie "dodanie nowej funkcji".
* `develop` - gałąź produkcyjna, na którą mergowane są gałęzie robocze.
* `release/1.0.0` - gałąź, na której tworzony jest release o numerze 1.0.0.
* `main` - gałąź produkcyjna, na którą mergowane są gałęzie release.

## Instrukcje

* Aby rozpocząć pracę nad zadaniem, stwórz gałąź `issue/nazwa_zadania`, przez przekonwertowanie swojego zadania na issue.
* Wykonaj wszystkie niezbędne zmiany w kodzie.
* Przetestuj zmiany.
* Merguj gałąź `issue/nazwa_zadania` do `developa`.
* Jeśli zmiany są gotowe do wydania, stwórz gałąź `release/1.0.0`.
* Przeciągnij wszystkie zmiany z `developa` do `release/1.0.0`.
* Przetestuj wydanie.
* Merguj gałąź `release/1.0.0` do `maina`.
