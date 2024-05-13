#include <stdio.h>
void main()
{
	int a,b,c;
	printf("Enter a number:");
	scanf("%d",&a);
	printf("Enter b number:");
	scanf("%d",&b);
	printf("Enter c number:");
	scanf("%d",&c);
	
	if(a>b && a>c)
	{
		printf("A is largest : %d",a);
	}
	else if (b>c)
	{
		printf("B is largest : %d",b);	
	}
	else
	{
		printf("C is largest : %d",c);
	}
}
