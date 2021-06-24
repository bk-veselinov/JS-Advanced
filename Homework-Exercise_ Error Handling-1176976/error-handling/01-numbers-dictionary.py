import sys

numbers_dictionary = {}

line = input()

while line != "Search":

    try:
        number_as_string = line
        number = int(input())
        numbers_dictionary[number_as_string] = number
    except ValueError:
        print("The variable number must be an integer")
        print(numbers_dictionary)
        sys.exit()  # Kills the process

    line = input()

while line != "Remove":
    line = input()

    searched = line
    print(numbers_dictionary[searched])

    line = input()

while line != "End":
    line = input()

    searched = line

    try:
        del numbers_dictionary[searched]
    except KeyError:
        print("Number does not exist in dictionary")
        print(numbers_dictionary)
        sys.exit()  # Kills the process

    line = input()

print(numbers_dictionary)
