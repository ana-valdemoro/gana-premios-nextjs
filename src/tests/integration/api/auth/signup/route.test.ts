// import { RequestListener } from 'http';
// import { NextApiHandler } from 'next';

// import httpClient from 'supertest';
// import http, { IncomingMessage, ServerResponse } from 'http';
// import { apiResolver } from 'next/dist/server/api-utils/node';

// test('POST api/auth/sigup', () => {
//   httpClient(app)
//     .get('/api/auth/signup')
//     .expect('Content-Type', /json/)
//     .expect('Content-Length', '15')
//     .expect(200)
//     .end(function (err, res) {
//       if (err) throw err;
//     });
// });

// const testClient = (handler: NextApiHandler) => {
//   const listener: RequestListener = (req, res) => {
//     return apiResolver(
//       req,
//       res,
//       undefined,
//       handler,
//       {
//         previewModeEncryptionKey: '',
//         previewModeId: '',
//         previewModeSigningKey: '',
//       },
//       false
//     );
//   };

//   return request(createServer(listener));
// };

// it("What's my name!?", async () => {
//   const client = testClient(handler);
//   const response = await client.get('/api/name').query({ name: 'John' });

//   console.log(response.body);

//   expect(true);
// });

// import { createRequestHandler } from 'next/dist/server/api-utils';
// import { createServer, Server } from 'http';
import httpClient from 'supertest';
import handler from '../../../../../app/api/prueba/route';

describe('/api/hello', () => {
  it('returns a greeting message', async () => {
    const response = await httpClient(handler).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, World!');
  });
});
