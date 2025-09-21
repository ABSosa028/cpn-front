"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos de ejemplo para los catálogos
const catalogsData = [
  {
    id: 1,
    nombre: "Puertos Marítimos",
    tipo: "Puertos",
    descripcion: "Catálogo de puertos marítimos internacionales",
    estado: "Activo",
    fechaCreacion: "2024-01-15",
    registros: 245,
  },
  {
    id: 2,
    nombre: "Tipos de Carga",
    tipo: "Carga",
    descripcion: "Clasificación de tipos de carga para transporte",
    estado: "Activo",
    fechaCreacion: "2024-01-20",
    registros: 89,
  },
  {
    id: 3,
    nombre: "Navieras",
    tipo: "Empresas",
    descripcion: "Directorio de empresas navieras",
    estado: "Inactivo",
    fechaCreacion: "2024-02-01",
    registros: 156,
  },
  {
    id: 4,
    nombre: "Contenedores",
    tipo: "Equipos",
    descripcion: "Tipos y especificaciones de contenedores",
    estado: "Activo",
    fechaCreacion: "2024-02-10",
    registros: 67,
  },
  {
    id: 5,
    nombre: "Rutas Comerciales",
    tipo: "Rutas",
    descripcion: "Principales rutas comerciales marítimas",
    estado: "Inactivo",
    fechaCreacion: "2024-02-15",
    registros: 123,
  },
]

export default function CatalogMaintenancePage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar catálogos basado en los filtros seleccionados
  const filteredCatalogs = catalogsData.filter((catalog) => {
    const matchesType = selectedType === "all" || catalog.tipo === selectedType
    const matchesStatus = selectedStatus === "all" || catalog.estado === selectedStatus
    const matchesSearch =
      !searchTerm ||
      catalog.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      catalog.descripcion.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesStatus && matchesSearch
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Mantenimiento de Catálogos</h1>
              <p className="text-muted-foreground mt-2">Gestiona y administra todos los catálogos del sistema</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Catálogo
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Búsqueda por texto */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar catálogos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por tipo */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Catálogo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Puertos">Puertos</SelectItem>
                  <SelectItem value="Carga">Tipos de Carga</SelectItem>
                  <SelectItem value="Empresas">Empresas</SelectItem>
                  <SelectItem value="Equipos">Equipos</SelectItem>
                  <SelectItem value="Rutas">Rutas</SelectItem>
                </SelectContent>
              </Select>

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
                  setSelectedType("all")
                  setSelectedStatus("all")
                  setSearchTerm("")
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de catálogos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Catálogos Existentes ({filteredCatalogs.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Total de registros: {filteredCatalogs.reduce((sum, catalog) => sum + catalog.registros, 0)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">Nombre</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Tipo</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Descripción</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Estado</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Registros</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Fecha Creación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCatalogs.map((catalog, index) => (
                    <TableRow key={catalog.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <TableCell className="font-medium">{catalog.nombre}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{catalog.tipo}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={catalog.descripcion}>
                        {catalog.descripcion}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(catalog.estado)}>{catalog.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{catalog.registros}</TableCell>
                      <TableCell>{catalog.fechaCreacion}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Search className="mr-2 h-4 w-4" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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

            {filteredCatalogs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No se encontraron catálogos que coincidan con los filtros seleccionados.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
