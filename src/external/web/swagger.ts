import fs from 'fs'
import path from 'path'

import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Express, Request } from 'express'
import _ from 'lodash'
import {
    getMetadataArgsStorage,
} from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import {
    serve,
    setup,
} from 'swagger-ui-express'
import YAML from 'yaml'
export async function setupSwagger(
    app: Express,
) {
    const storage = getMetadataArgsStorage()
    const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/components/schemas/',
    })

    const spec = routingControllersToSpec(storage, undefined, {
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development',
            },
        ],
        components: {
            schemas: _(schemas)
                .toPairs()
                .orderBy(([key]) => {
                    return [key.endsWith('Schema'), key]
                })
                .fromPairs()
                .value() as any,
            securitySchemes: {
                bearerAuth: {
                    scheme: 'bearer',
                    type: 'http',
                },
            },
        },
        info: {
            title: 'NOTIFICATION API',
            description: 'This project is a queue message',
            version: '1.0.0',
        },
    })

    fs.writeFileSync(path.resolve('swagger.yml'), YAML.stringify(spec))


    const serveInstance = setup(spec, {
        swaggerOptions: {
            persistAuthorization: true,
            authToken: '',
        },
    })

    app.use(`/docs`, serve)
    app.get(`/docs`, serveInstance)
}



