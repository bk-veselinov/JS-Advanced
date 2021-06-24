from ceh import *

valid_domains = [".com", ".bg", ".net", ".org"]

while True:
    line = input()

    if line == "End":
        break

    if "@" not in line:
        raise MustContainAtSymbolError("Email must contain @")
    else:
        name = line[:line.index("@")]

    if len(name) <= 4:
        raise NameTooShortError("Name must be more than 4 characters")

    domain = line[line.index("."):]

    if domain not in valid_domains:
        raise InvalidDomainError("Domain must be one of the following: .com, .bg, .org, .net")

    print("Email is valid")
