"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Power, PowerOff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos de ejemplo para los elementos del catálogo
const catalogItemsData = [
  {
    id: 1,
    codigo: "PTO-001",
    nombre: "Puerto de Barcelona",
    descripcion: "Puerto principal de Barcelona, España",
    estado: "Activo",
    fechaCreacion: "2024-01-15",
    fechaModificacion: "2024-03-10",
  },
  {
    id: 2,
    codigo: "PTO-002",
    nombre: "Puerto de Valencia",
    descripcion: "Puerto comercial de Valencia, España",
    estado: "Activo",
    fechaCreacion: "2024-01-16",
    fechaModificacion: "2024-02-20",
  },
  {
    id: 3,
    codigo: "PTO-003",
    nombre: "Puerto de Bilbao",
    descripcion: "Puerto industrial del País Vasco",
    estado: "Inactivo",
    fechaCreacion: "2024-01-18",
    fechaModificacion: "2024-01-25",
  },
  {
    id: 4,
    codigo: "PTO-004",
    nombre: "Puerto de Algeciras",
    descripcion: "Puerto estratégico del Estrecho de Gibraltar",
    estado: "Activo",
    fechaCreacion: "2024-01-20",
    fechaModificacion: "2024-03-05",
  },
  {
    id: 5,
    codigo: "PTO-005",
    nombre: "Puerto de Las Palmas",
    descripcion: "Puerto principal de Gran Canaria",
    estado: "En Revisión",
    fechaCreacion: "2024-02-01",
    fechaModificacion: "2024-03-01",
  },
  {
    id: 6,
    codigo: "PTO-006",
    nombre: "Puerto de Santander",
    descripcion: "Puerto comercial de Cantabria",
    estado: "Activo",
    fechaCreacion: "2024-02-05",
    fechaModificacion: "2024-02-28",
  },
]

export default function CatalogItemsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchCode, setSearchCode] = useState("")
  const [searchName, setSearchName] = useState("")

  // Filtrar elementos basado en los filtros seleccionados
  const filteredItems = catalogItemsData.filter((item) => {
    const matchesStatus = selectedStatus === "all" || item.estado === selectedStatus
    const matchesCode = !searchCode || item.codigo.toLowerCase().includes(searchCode.toLowerCase())
    const matchesName = !searchName || item.nombre.toLowerCase().includes(searchName.toLowerCase())

    return matchesStatus && matchesCode && matchesName
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Activo":
        return "default"
      case "Inactivo":
        return "secondary"
      case "En Revisión":
        return "outline"
      default:
        return "secondary"
    }
  }

  const handleToggleStatus = (itemId: number, currentStatus: string) => {
    // Aquí iría la lógica para cambiar el estado del elemento
    console.log(`Cambiando estado del elemento ${itemId} de ${currentStatus}`)
  }

  const handleEdit = (itemId: number) => {
    // Aquí iría la lógica para editar el elemento
    console.log(`Editando elemento ${itemId}`)
  }

  const handleDelete = (itemId: number) => {
    // Aquí iría la lógica para eliminar el elemento
    console.log(`Eliminando elemento ${itemId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">
                Mantenimiento de Elementos - Puertos Marítimos
              </h1>
              <p className="text-muted-foreground mt-2">
                Gestiona y administra los elementos del catálogo seleccionado
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Elemento
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
              {/* Búsqueda por código */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por código..."
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Búsqueda por nombre */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por estado */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="En Revisión">En Revisión</SelectItem>
                </SelectContent>
              </Select>

              {/* Botón limpiar filtros */}
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus("all")
                  setSearchCode("")
                  setSearchName("")
                }}
              >
                Limpiar Filtros
              </Button>

              {/* Botón volver */}
              <Button variant="outline">Volver a Catálogos</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de elementos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Elementos del Catálogo ({filteredItems.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Activos: {filteredItems.filter((item) => item.estado === "Activo").length} | Inactivos:{" "}
                {filteredItems.filter((item) => item.estado === "Inactivo").length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">Código</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Nombre</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Descripción</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Estado</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Fecha Creación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Última Modificación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item, index) => (
                    <TableRow key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <TableCell className="font-medium font-mono">{item.codigo}</TableCell>
                      <TableCell className="font-medium">{item.nombre}</TableCell>
                      <TableCell className="max-w-xs truncate" title={item.descripcion}>
                        {item.descripcion}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(item.estado)}>{item.estado}</Badge>
                      </TableCell>
                      <TableCell>{item.fechaCreacion}</TableCell>
                      <TableCell>{item.fechaModificacion}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(item.id, item.estado)}
                              className={item.estado === "Activo" ? "text-orange-600" : "text-green-600"}
                            >
                              {item.estado === "Activo" ? (
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
                            <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
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

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No se encontraron elementos que coincidan con los filtros seleccionados.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
