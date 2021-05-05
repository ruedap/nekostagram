import { Prisma } from '@prisma/client'
import { db } from 'src/lib/db'

export const nekos = () => {
  return db.neko.findMany()
}

export const neko = ({ id }: Prisma.NekoWhereUniqueInput) => {
  return db.neko.findUnique({
    where: { id },
  })
}

interface CreateNekoArgs {
  input: Prisma.NekoCreateInput
}

export const createNeko = ({ input }: CreateNekoArgs) => {
  return db.neko.create({
    data: input,
  })
}

interface UpdateNekoArgs extends Prisma.NekoWhereUniqueInput {
  input: Prisma.NekoUpdateInput
}

export const updateNeko = ({ id, input }: UpdateNekoArgs) => {
  return db.neko.update({
    data: input,
    where: { id },
  })
}

export const deleteNeko = ({ id }: Prisma.NekoWhereUniqueInput) => {
  return db.neko.delete({
    where: { id },
  })
}
