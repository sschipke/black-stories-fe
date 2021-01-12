# Garrett:
## Managing code

In atom with your terminal open (`ctrl + ~`)

Type the following commands in order:

1. $ `git checkout develop`
   * this will checkout to the main 'branch' which is the code we use to deploy to the internet
1. $ `git pull` 
   * This will fetch the latest version of code from this main branch
1. $ `git checkout gchappell`
    * This is your 'local branch' where you can make changes
1. $ `git merge develop`
   * This will bring in the latest changes to your local branch which will allow you to work on changes without creating too many conflicts