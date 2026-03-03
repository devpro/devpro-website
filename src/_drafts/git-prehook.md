# Git prehook

Create a file `.githooks/pre-commit` in the git repo:

```bash
#!/bin/sh

testresult=$(dotnet test -v q 2>&1)
errors=`echo $testresult | grep "[FAIL]"`
if [[ $testresult == *"[FAIL]"* ]]; then
  echo
  echo "Commit has been rejected, at least one .NET test is failing:"
  echo
  echo $errors
  echo
  echo "Please fix the errors."
  exit 1
fi
```
