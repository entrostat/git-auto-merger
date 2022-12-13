import {expect, test} from '@oclif/test'

describe('set:project-name', () => {
  test
  .stdout()
  .command(['set:project-name'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['set:project-name', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
