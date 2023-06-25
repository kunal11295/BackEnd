function outerfunction()
{
    var myname='awdiz';
    function innerfunction()
    {
        console.log(myname)

    }
    return innerfunction();
}
var myfun=outerfunction;
console.log(myfun())