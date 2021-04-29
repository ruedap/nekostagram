import { nekos, neko, createNeko, updateNeko, deleteNeko } from './nekos'

describe('nekos', () => {
  scenario('returns all nekos', async (scenario) => {
    const result = await nekos()

    expect(result.length).toEqual(Object.keys(scenario.neko).length)
  })

  scenario('returns a single neko', async (scenario) => {
    const result = await neko({ id: scenario.neko.one.id })

    expect(result).toEqual(scenario.neko.one)
  })

  scenario('creates a neko', async (scenario) => {
    const result = await createNeko({
      input: { url: 'String' },
    })

    expect(result.url).toEqual('String')
  })

  scenario('updates a neko', async (scenario) => {
    const original = await neko({ id: scenario.neko.one.id })
    const result = await updateNeko({
      id: original.id,
      input: { url: 'String2' },
    })

    expect(result.url).toEqual('String2')
  })

  scenario('deletes a neko', async (scenario) => {
    const original = await deleteNeko({ id: scenario.neko.one.id })
    const result = await neko({ id: original.id })

    expect(result).toEqual(null)
  })
})
