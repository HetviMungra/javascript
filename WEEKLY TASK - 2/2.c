#include<stdio.h>

int mylen(char str[30]);

int main()
{
 char str[30];
 int i, len;

 printf("Enter string:\n");
 gets(str);

 len = mylen(str); 
 printf("Length of given string is: %d", len);

 return 0;
}


int mylen(char str[30])
{
 int i, len=0;

 for(i=0;str[i]!='\0';i++)
 {
  len++;
 }

 return(len);
}
