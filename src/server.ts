import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
    type ZodTypeProvider,
    serializerCompiler,
    validatorCompiler,
  } from 'fastify-type-provider-zod'
  import z from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()
 
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.post('/subscriptions',{
    schema:{
        body: z.object({
            name: z.string(),
            email: z.string().email()
        }),
        response:{
            201: z.object({
                name: z.string(),
                email: z.string()
            })
        }
    }
}, async (request, reply) =>{
    const {name, email} = request.body

    //Criação da inscrição no banco de dados

    return reply.status(201).send({
        name,
        email
    })
})


app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})