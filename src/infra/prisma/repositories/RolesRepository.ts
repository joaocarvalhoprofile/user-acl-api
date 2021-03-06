import { injectable } from "tsyringe"

import prismaClient from ".."
import { IRoleDTO } from "../../../domain/users/dto/IRoleDTO"
import { IRolesRepository } from "../../../domain/users/IRolesRepository"

@injectable()
export class RolesRepository implements IRolesRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async listRolesById(id: string): Promise<IRoleDTO[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          select: {
            permission: {
              select: {
                id: true,
                method: true,
                action: true,
                description: true,
              }
            }
          }
        },
      },
    })

    return roles
  }

  public async findAll(tenant_id: string): Promise<IRoleDTO[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        tenant_id: tenant_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          select: {
            permission: {
              select: {
                id: true,
                method: true,
                action: true,
                description: true,
              }
            }
          }
        },
      },
    })
    return roles
  }

  public async findByName(tenant_id: string, name: string): Promise<IRoleDTO> {
    const role = await this.prisma.role.findFirst({
      where: {
        tenant_id: tenant_id,
        name: name
      },
    })
    return role
  }

  public async update(entity: IRoleDTO): Promise<IRoleDTO> {
    return
  }
  public async save(entity: IRoleDTO): Promise<IRoleDTO> {
    const createdRole = await this.prisma.role.create({
      data: entity
    })

    return createdRole
  }

}