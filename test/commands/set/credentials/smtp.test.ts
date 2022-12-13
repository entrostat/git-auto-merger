import {expect, test} from '@oclif/test'

describe('set:credentials:smtp', () => {
  test
  .stdout()
  .command(['set:credentials:smtp'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['set:credentials:smtp', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
