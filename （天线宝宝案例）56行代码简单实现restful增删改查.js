const Koa=require('koa')
const bodyparser=require('koa-bodyparser')
const Router=require('koa-router')
const app=new Koa()
const router=new Router()
const usersRouter=new Router({
    prefix:`/users`
})

const db=[{name:'迪西温馨提醒：结合后台和postman观察哦，为你开通put，del，post，get功能'}]

router.get('/',(ctx)=>{
    console.log('/是调用db静态数据')
ctx.body=db
})

usersRouter.get('/',(ctx)=>{
    ctx.set('Allow','GET,POST,del,put')
    console.log('admins列表')
    ctx.body=[
        {name:'迪西'},
        {name:'拉拉'},
        {name:'小波'},
        {name:'丁丁'},
    ]
})

usersRouter.post('/',(ctx)=>{
    console.log('新建一只天线小宝功能,get:/得到数据')
    db.push(ctx.request.body)
    ctx.body=ctx.request.body
})

usersRouter.get('/:id',(ctx)=>{
    console.log('get获取特定用户')
    ctx.body=db[ctx.params.id*1]
})

usersRouter.put('/:id',(ctx)=>{
    console.log('put修改特定用户')
   db[ctx.params.id*1]=ctx.request.body;
    ctx.body=ctx.request.body

})

usersRouter.delete('/:id',(ctx)=>{
    console.log('拒接宝宝')
    db.splice(ctx.params.id*1,1)
    ctx.body=204
})
console.log('success first')
app.use(router.routes())
app.use(bodyparser())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.listen(3000)