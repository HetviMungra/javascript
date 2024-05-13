#include<stdio.h>

int main ()
{
    int num, sum = 0;
 
    
    printf("The number is = \n");
	scanf("%d",&sum)
    while(num!=0){
        sum += num % 10;
        num = num / 10;
    }
 
    printf("Sum: %d\n",sum);
 
  }

