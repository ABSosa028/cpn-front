"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Eye,
  KeyRound,
  Shield,
  Settings,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const usersData = [
  {
    id: 1,
    nombre: "Juan Carlos Pérez",
    correo: "juan.perez@cpn.gob.gt",
    estado: "activo",
    rol: "Técnico CPN",
    rolId: 1,
    fechaCreacion: "2024-01-15",
    ultimoAcceso: "2024-03-15 14:30",
  },
  {
    id: 2,
    nombre: "María Elena González",
    correo: "maria.gonzalez@empresa-portuaria.com",
    estado: "activo",
    rol: "Empresa Portuaria",
    rolId: 2,
    fechaCreacion: "2024-01-20",
    ultimoAcceso: "2024-03-14 09:15",
  },
  {
    id: 3,
    nombre: "Roberto Martínez",
    correo: "roberto.martinez@cpn.gob.gt",
    estado: "bloqueado",
    rol: "Seguridad CPN",
    rolId: 3,
    fechaCreacion: "2024-02-01",
    ultimoAcceso: "2024-03-10 16:45",
  },
  {
    id: 4,
    nombre: "Ana Sofía López",
    correo: "ana.lopez@cpn.gob.gt",
    estado: "activo",
    rol: "Supervisor Estadístico",
    rolId: 4,
    fechaCreacion: "2024-02-10",
    ultimoAcceso: "2024-03-15 11:20",
  },
  {
    id: 5,
    nombre: "Carlos Eduardo Ruiz",
    correo: "carlos.ruiz@cpn.gob.gt",
    estado: "inactivo",
    rol: "Administrador CPN",
    rolId: 5,
    fechaCreacion: "2024-01-05",
    ultimoAcceso: "2024-02-28 13:10",
  },
  {
    id: 6,
    nombre: "Lucía Fernández",
    correo: "lucia.fernandez@cpn.gob.gt",
    estado: "deshabilitado",
    rol: "Operario Estadístico",
    rolId: 6,
    fechaCreacion: "2024-02-15",
    ultimoAcceso: "2024-03-01 08:30",
  },
]

export default function UsersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchNombre, setSearchNombre] = useState("")
  const [searchCorreo, setSearchCorreo] = useState("")

  const filteredUsers = usersData.filter((user) => {
    const matchesStatus = selectedStatus === "all" || user.estado === selectedStatus
    const matchesNombre = !searchNombre || user.nombre.toLowerCase().includes(searchNombre.toLowerCase())
    const matchesCorreo = !searchCorreo || user.correo.toLowerCase().includes(searchCorreo.toLowerCase())

    return matchesStatus && matchesNombre && matchesCorreo
  })

  const getStatusBadgeVariant = (estado: string) => {
    switch (estado) {
      case "activo":
        return "default"
      case "inactivo":
        return "secondary"
      case "bloqueado":
        return "destructive"
      case "deshabilitado":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "text-green-600"
      case "inactivo":
        return "text-gray-600"
      case "bloqueado":
        return "text-red-600"
      case "deshabilitado":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const handleViewUser = (userId: number) => {
    console.log(`Viendo detalles del usuario ${userId}`)
  }

  const handleResetPassword = (userId: number, userEmail: string) => {
    console.log(`Enviando correo de restablecimiento de contraseña a ${userEmail} para usuario ${userId}`)
  }

  const handleBlockUser = (userId: number) => {
    console.log(`Bloqueando usuario ${userId}`)
  }

  const handleToggleStatus = (userId: number, currentStatus: string) => {
    console.log(`Cambiando estado del usuario ${userId} desde ${currentStatus}`)
  }

  const handleEdit = (userId: number) => {
    console.log(`Editando usuario ${userId}`)
  }

  const handleDelete = (userId: number) => {
    console.log(`Eliminando usuario ${userId}`)
  }

  const handlePermissions = (userId: number) => {
    console.log(`Abriendo mantenimiento de permisos para usuario ${userId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Mantenimiento de Usuarios</h1>
              <p className="text-muted-foreground mt-2">Gestiona y administra los usuarios del sistema portuario</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Usuario
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filtros y búsqueda */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchNombre}
                  onChange={(e) => setSearchNombre(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por correo..."
                  value={searchCorreo}
                  onChange={(e) => setSearchCorreo(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activos</SelectItem>
                  <SelectItem value="inactivo">Inactivos</SelectItem>
                  <SelectItem value="bloqueado">Bloqueados</SelectItem>
                  <SelectItem value="deshabilitado">Deshabilitados</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus("all")
                  setSearchNombre("")
                  setSearchCorreo("")
                }}
              >
                Limpiar Filtros
              </Button>

              <Button variant="outline">Volver a Catálogos</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Usuarios del Sistema ({filteredUsers.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Activos: {filteredUsers.filter((user) => user.estado === "activo").length} | Bloqueados:{" "}
                {filteredUsers.filter((user) => user.estado === "bloqueado").length} | Inactivos:{" "}
                {filteredUsers.filter((user) => user.estado === "inactivo").length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">Nombre</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Correo Electrónico</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Estado</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Rol</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Fecha Creación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Último Acceso</TableHead>
                    <TableHead className="text-primary-foreground font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow key={user.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <TableCell className="font-medium">{user.nombre}</TableCell>
                      <TableCell className="text-muted-foreground">{user.correo}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.estado)} className={getStatusColor(user.estado)}>
                          {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{user.rol}</TableCell>
                      <TableCell>{user.fechaCreacion}</TableCell>
                      <TableCell>{user.ultimoAcceso}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Usuario
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar Información
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleResetPassword(user.id, user.correo)}>
                              <KeyRound className="mr-2 h-4 w-4" />
                              Restablecer Contraseña
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePermissions(user.id)}>
                              <Settings className="mr-2 h-4 w-4" />
                              Permisos
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.estado !== "bloqueado" && (
                              <DropdownMenuItem onClick={() => handleBlockUser(user.id)} className="text-orange-600">
                                <Shield className="mr-2 h-4 w-4" />
                                Bloquear Usuario
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(user.id, user.estado)}
                              className={user.estado === "activo" ? "text-orange-600" : "text-green-600"}
                            >
                              {user.estado === "activo" ? (
                                <>
                                  <PowerOff className="mr-2 h-4 w-4" />
                                  Deshabilitar
                                </>
                              ) : (
                                <>
                                  <Power className="mr-2 h-4 w-4" />
                                  Activar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No se encontraron usuarios que coincidan con los filtros seleccionados.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
