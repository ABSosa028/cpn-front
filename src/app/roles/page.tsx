"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Power, PowerOff, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const systemRolesData = [
  {
    id: 1,
    nombre: "Técnico CPN",
    descripcion: "Personal técnico de la Comisión Portuaria Nacional",
    activo: true,
    fechaCreacion: "2024-01-15",
    fechaModificacion: "2024-03-10",
    usuariosAsignados: 12,
  },
  {
    id: 2,
    nombre: "Empresa Portuaria",
    descripcion: "Representante de empresa portuaria autorizada",
    activo: true,
    fechaCreacion: "2024-01-16",
    fechaModificacion: "2024-02-20",
    usuariosAsignados: 8,
  },
  {
    id: 3,
    nombre: "Seguridad CPN",
    descripcion: "Personal de seguridad de la Comisión Portuaria Nacional",
    activo: true,
    fechaCreacion: "2024-01-18",
    fechaModificacion: "2024-01-25",
    usuariosAsignados: 5,
  },
  {
    id: 4,
    nombre: "Supervisor Estadístico",
    descripcion: "Supervisor del área de estadísticas portuarias",
    activo: true,
    fechaCreacion: "2024-01-20",
    fechaModificacion: "2024-03-05",
    usuariosAsignados: 3,
  },
  {
    id: 5,
    nombre: "Administrador CPN",
    descripcion: "Administrador del sistema de la Comisión Portuaria Nacional",
    activo: true,
    fechaCreacion: "2024-02-01",
    fechaModificacion: "2024-03-01",
    usuariosAsignados: 2,
  },
  {
    id: 6,
    nombre: "Operario Estadístico",
    descripcion: "Operario del área de estadísticas portuarias",
    activo: true,
    fechaCreacion: "2024-02-05",
    fechaModificacion: "2024-02-28",
    usuariosAsignados: 15,
  },
  {
    id: 7,
    nombre: "Sistema",
    descripcion: "Rol del sistema para procesos automatizados",
    activo: false,
    fechaCreacion: "2024-01-10",
    fechaModificacion: "2024-01-10",
    usuariosAsignados: 0,
  },
]

export default function SystemRolesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchNombre, setSearchNombre] = useState("")
  const [searchDescripcion, setSearchDescripcion] = useState("")

  const filteredRoles = systemRolesData.filter((role) => {
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "activo" && role.activo) ||
      (selectedStatus === "inactivo" && !role.activo)
    const matchesNombre = !searchNombre || role.nombre.toLowerCase().includes(searchNombre.toLowerCase())
    const matchesDescripcion =
      !searchDescripcion || role.descripcion.toLowerCase().includes(searchDescripcion.toLowerCase())

    return matchesStatus && matchesNombre && matchesDescripcion
  })

  const handleToggleStatus = (roleId: number, currentStatus: boolean) => {
    console.log(`Cambiando estado del rol ${roleId} de ${currentStatus ? "activo" : "inactivo"}`)
  }

  const handleEdit = (roleId: number) => {
    console.log(`Editando rol ${roleId}`)
  }

  const handleDelete = (roleId: number) => {
    console.log(`Eliminando rol ${roleId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Mantenimiento de Roles del Sistema</h1>
              <p className="text-muted-foreground mt-2">
                Gestiona y administra los roles de usuario del sistema portuario
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Rol
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
                  placeholder="Buscar por descripción..."
                  value={searchDescripcion}
                  onChange={(e) => setSearchDescripcion(e.target.value)}
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
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus("all")
                  setSearchNombre("")
                  setSearchDescripcion("")
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
              <CardTitle>Roles del Sistema ({filteredRoles.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Activos: {filteredRoles.filter((role) => role.activo).length} | Inactivos:{" "}
                {filteredRoles.filter((role) => !role.activo).length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">Nombre del Rol</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Descripción</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Estado</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Usuarios Asignados</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Fecha Creación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Última Modificación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role, index) => (
                    <TableRow key={role.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <TableCell className="font-medium">{role.nombre}</TableCell>
                      <TableCell className="text-muted-foreground">{role.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant={role.activo ? "default" : "secondary"}>
                          {role.activo ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{role.usuariosAsignados}</span>
                        </div>
                      </TableCell>
                      <TableCell>{role.fechaCreacion}</TableCell>
                      <TableCell>{role.fechaModificacion}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(role.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(role.id, role.activo)}
                              className={role.activo ? "text-orange-600" : "text-green-600"}
                            >
                              {role.activo ? (
                                <>
                                  <PowerOff className="mr-2 h-4 w-4" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <Power className="mr-2 h-4 w-4" />
                                  Activar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(role.id)} className="text-destructive">
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

            {filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No se encontraron roles que coincidan con los filtros seleccionados.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
