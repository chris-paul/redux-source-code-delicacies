### javascript词法作用域和语法作用域

#### JS引擎的执行顺序

+ 1、读入第一个代码段（js执行引擎并非一行一行地执行程序，而是一段一段地分析执行的）

+ 2、做词法分析和语法分析，有错则报语法错误(比如括号不匹配等),如果报错重复步骤5

+ 3、对【var】变量和【function】定义做“预解析“（永远不会报错的，因为只解析正确的声明）

+ 4、执行代码段，有错则报错（比如变量未定义）

+ 5、如果还有下一个代码段，则读入下一个代码段，重复步骤2

#### 举例说明JS的解析过程

+ 全局执行环境下的代码段

```javascript
/*全局（window）域下的一段代码*/
var i = 1 , j = 2 , k = 3 ;
function a(o,p,x,q){
    var x = 4 ;
    alert(i);
    function b(r,s){
        var i = 11 , y = 5 ;
        alert(i);
        function c(t){
            var z = 6 ;
            alert(i);
        } ;
        //函数表达式
        var d = function(){
            alert(y);
        };
        c(60);
        d();
    };
    b(40,50);
}
a(10,20,30);
```
+ JS引擎通过语法分析和预解析建立语法作用域

    + 1、变量集（variables）中，只有变量定义，没有变量值，这时候的变量值全部为“undefined”

    + 2、作用域（scope），根据词法作用域的特点，这个时候每个变量的作用域就已经明确了，而不会随执行时的环境而改变。

    + 3、作用域（scope）建立规则

        + 对于函数声明和匿名函数表达式来说，[scope]就是它创建时的作用域

        + 对于有名字的函数表达式，[scope]顶端是一个新的JS对象（也就是继承了Object.prototype），这个对象有两个属性，第一个是自身的名称，第二个是定义的作用域，第一个函数名称是为了确保函数内部的代码可以无误地访问自己的函数名进行递归。
```javascript
var SyntaxTree = {
    window:{
        variables:{
            i:{
                value:1
            },
            i
            j:{
                value:2
            },
            i
            k:{
                value:3
            }
        },
        functions:{
            a:this.a
        }
    },
    a:{
        variables:{
            x:undefined
        },
        functions:{
            b:this.b
        },
        scope:this.window
    },
    b:{
        variables:{
            y:undefined
        },
        functions:{
            c:this.c,
            d:this.d
        },
        scope:this.a
    },
    c:{
        variables:{
            z:undefined
        },
        functions:{},
        scope:this.b
    },
    d:{
        variables:{},
        functions:{},
        scope:{
            myname:d,
            scope:this.b
        }
    }
}
```
+ 执行环境的创建

    + 当我们的函数开始执行的时候就会创建这个函数的执行环境, 下面是这个例子中所有的函数的执行环境

    + body:指向当前方法的活动对象

    + scopeChain: 作用域链，根据语法分析树中当前方法对应的scope属性，它指向scope对应的方法的活动对象（ActivceObject），变量查找就是跟着这条链条查找的

```javascript
var ExecutionContext = {
    window:{
        type:'global',
        name:'global',
        body:ActiveObject.window
    },
    a:{
        type:'function',
        name:'a',
        body:ActiveObject.a,
        scopeChain:this.window.body
    },
    b:{
        type:'function',
        name:'b',
        body:ActiveObject.b,
        scopeChain:this.a.body
    },
    d:{
        type:'function',
        name:'d',
        body:ActiveObject.d,
        scopeChain:this.b.body
    }     
}
```    
+ 活动对象

    + 创建活动对象，从语法分析树复制方法的内部变量集（variables）和内嵌函数集（functions）

    + 方法开始执行，活动对象里的内部变量集全部被重置为 undefined

    + 创建形参（parameters）和实参（arguments）对象，同名的实参，形参和变量之间是【引用】关系

    + 执行方法内的赋值语句，这才会对变量集中的变量进行赋值处理

    + 变量查找规则是首先在当前执行环境的 ActiveObject 中寻找，没找到，则顺着执行环境中属性 ScopeChain 指向的 ActiveObject 中寻找，一直到 Global Object（window）

    + 方法执行完成后，内部变量值不会被重置，至于变量什么时候被销毁，请参考下面一条

    + 方法内变量的生存周期取决于方法实例是否存在活动引用，如没有就销毁活动对象

    + 6和7 是使闭包能访问到外部变量的根本原因
```javascript
var ActiveObject = {
    window:{
        variables:{
            i:{
                value:i
            },
            j:{
                value:2
            },
            k:{
                value:3
            }
        },
        functions:{
            a:this.a
        }
    },
    a:{
        variables:{
            x:{
                value:4
            }
        },
        functions:{
            b:SyntaxTree.b
        },
        parameters{
            o:{
                value:10
            },
            p:{
                value:20
            },
            x:this.variables.x,
            q:undefined
        },
        arguments:[this.parameters.o,this.parameters.p,this.  parameters.x]
    },
    b:{
        variables:{
            y:{
                value:5
            }
        },
        functions{
            c:SyntaxTree.c,
            d:SyntaxTree.d
        },
        parameters:{
            r:{
                value:40
            },
            s:{
                value:50
            }
        },
        arguments:[this.parameters.r,this.parameters.s]
    },
    c:{
        variables:{
            z:{
                value:6
            }    
        },
        functions:{

        },
        parameters:{
            u:{
                value:70
            }
        },
        arguments:[this.parameters.u]
    },
    d:{
        variables:{} ,
        functions:{} ,
        parameters:{} ,
        arguments:[]
    }
}
```  
#### 引用资料
+ https://blog.csdn.net/huli870715/article/details/6387243
