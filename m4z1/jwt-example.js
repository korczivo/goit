import jwt from 'jsonwebtoken';

// const payload = {
//     id: 'some_id',
//     username: 'some_username',
// }

const secret = 'vHG$6Lz#rKp8E3Rd%2qX!9oNs^5tHu&8yGjAmHfFnBvCdZxVcXbFn'

// const token = jwt.sign(payload, secret, { expiresIn: '12h' });

// console.log(token);

const originalToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNvbWVfaWQiLCJ1c2VybmFtZSI6InNvbWVfdXNlcm5hbWUiLCJpYXQiOjE3MTIzOTQ1ODUsImV4cCI6MTcxMjQzNzc4NX0.PaxK8fhRlJ-UEIRZ3c56f0910wyGnq7iKYeBr-B3tFc';

const secondToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNvbWVfaWQiLCJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJzb21lX3VzZXJuYW1lIiwiaWF0IjoxNzEyMzk0NTg1LCJleHAiOjE3MTI0Mzc3ODV9.5u-E3trVCG3AzvozaihK__E1lXgnbjpyv1PJ56TDkPQ'

const thirdToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNvbWVfaWQiLCJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJzb21lX3VzZXJuYW1lIiwiaWF0IjoxNzEyMzk0NTg1LCJleHAiOjE3MTI0Mzc3ODV9._FhSKuXr3vMZIyazgL3YnkdnNLPVSJRLnOvpu0AfpYk';

try {
    const verified = jwt.verify(thirdToken, secret);
    console.log(verified);
} catch (error) {
    console.log(error)
}