#include <stdio.h>
void main()
{
	int a;
	printf("Enter a number:");
	scanf("%d",&a);
	if(a%4==0)
	{
		printf("%d leap year..",a);
	}
	else
	{
		printf("%d Not leap year..",a);	
	}
}
