"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Power, PowerOff, Star, StarOff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const tariffItemsData = [
  {
    id: 1,
    inciso: "0101.21.00.00",
    unidad: "KG",
    principal: true,
    activa: true,
    fechaCreacion: "2024-01-15",
    fechaModificacion: "2024-03-10",
  },
  {
    id: 2,
    inciso: "0101.29.00.00",
    unidad: "UN",
    principal: false,
    activa: true,
    fechaCreacion: "2024-01-16",
    fechaModificacion: "2024-02-20",
  },
  {
    id: 3,
    inciso: "0102.21.00.00",
    unidad: "KG",
    principal: true,
    activa: false,
    fechaCreacion: "2024-01-18",
    fechaModificacion: "2024-01-25",
  },
  {
    id: 4,
    inciso: "0102.29.00.00",
    unidad: "LT",
    principal: false,
    activa: true,
    fechaCreacion: "2024-01-20",
    fechaModificacion: "2024-03-05",
  },
  {
    id: 5,
    inciso: "0103.10.00.00",
    unidad: "UN",
    principal: true,
    activa: true,
    fechaCreacion: "2024-02-01",
    fechaModificacion: "2024-03-01",
  },
  {
    id: 6,
    inciso: "0103.91.00.00",
    unidad: "KG",
    principal: false,
    activa: false,
    fechaCreacion: "2024-02-05",
    fechaModificacion: "2024-02-28",
  },
]

export default function TariffItemsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchInciso, setSearchInciso] = useState("")
  const [searchUnidad, setSearchUnidad] = useState("")

  const filteredItems = tariffItemsData.filter((item) => {
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "activa" && item.activa) ||
      (selectedStatus === "inactiva" && !item.activa)
    const matchesInciso = !searchInciso || item.inciso.toLowerCase().includes(searchInciso.toLowerCase())
    const matchesUnidad = !searchUnidad || item.unidad.toLowerCase().includes(searchUnidad.toLowerCase())

    return matchesStatus && matchesInciso && matchesUnidad
  })

  const handleToggleStatus = (itemId: number, currentStatus: boolean) => {
    console.log(`Cambiando estado del inciso ${itemId} de ${currentStatus ? "activo" : "inactivo"}`)
  }

  const handleTogglePrincipal = (itemId: number, currentPrincipal: boolean) => {
    console.log(`Cambiando principal del inciso ${itemId} de ${currentPrincipal}`)
  }

  const handleEdit = (itemId: number) => {
    console.log(`Editando inciso ${itemId}`)
  }

  const handleDelete = (itemId: number) => {
    console.log(`Eliminando inciso ${itemId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Mantenimiento de Incisos Arancelarios</h1>
              <p className="text-muted-foreground mt-2">Gestiona y administra los incisos arancelarios del sistema</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Inciso
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
                  placeholder="Buscar por inciso..."
                  value={searchInciso}
                  onChange={(e) => setSearchInciso(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por unidad..."
                  value={searchUnidad}
                  onChange={(e) => setSearchUnidad(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="activa">Activos</SelectItem>
                  <SelectItem value="inactiva">Inactivos</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus("all")
                  setSearchInciso("")
                  setSearchUnidad("")
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
              <CardTitle>Incisos Arancelarios ({filteredItems.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Activos: {filteredItems.filter((item) => item.activa).length} | Inactivos:{" "}
                {filteredItems.filter((item) => !item.activa).length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">Inciso</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Unidad</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Principal</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Estado</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Fecha Creación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Última Modificación</TableHead>
                    <TableHead className="text-primary-foreground font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item, index) => (
                    <TableRow key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <TableCell className="font-medium font-mono">{item.inciso}</TableCell>
                      <TableCell className="font-medium">{item.unidad}</TableCell>
                      <TableCell>
                        <Badge variant={item.principal ? "default" : "secondary"}>
                          {item.principal ? (
                            <>
                              <Star className="w-3 h-3 mr-1" />
                              Principal
                            </>
                          ) : (
                            "Secundario"
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.activa ? "default" : "secondary"}>
                          {item.activa ? "Activo" : "Inactivo"}
                        </Badge>
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
                              onClick={() => handleTogglePrincipal(item.id, item.principal)}
                              className="text-blue-600"
                            >
                              {item.principal ? (
                                <>
                                  <StarOff className="mr-2 h-4 w-4" />
                                  Quitar Principal
                                </>
                              ) : (
                                <>
                                  <Star className="mr-2 h-4 w-4" />
                                  Marcar Principal
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(item.id, item.activa)}
                              className={item.activa ? "text-orange-600" : "text-green-600"}
                            >
                              {item.activa ? (
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
                  No se encontraron incisos arancelarios que coincidan con los filtros seleccionados.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
