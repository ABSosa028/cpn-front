"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Download, BarChart3, Calendar, Building2, Send, TrendingUp, FileText, Activity } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para reportes de interoperabilidad
const interoperabilityData = [
  {
    id: 1,
    fecha: "2024-12-18",
    puerto: "Puerto Quetzal S.A.",
    tipoEnvio: "Manifiesto de Carga",
    cantidad: 45,
    estado: "exitoso",
    horaUltimoEnvio: "14:30:25",
  },
  {
    id: 2,
    fecha: "2024-12-18",
    puerto: "Terminal de Contenedores del Pacífico",
    tipoEnvio: "Estadísticas Portuarias",
    cantidad: 12,
    estado: "exitoso",
    horaUltimoEnvio: "13:45:10",
  },
  {
    id: 3,
    fecha: "2024-12-18",
    puerto: "Puerto Santo Tomás de Castilla",
    tipoEnvio: "Notificación de Arribo",
    cantidad: 28,
    estado: "exitoso",
    horaUltimoEnvio: "12:15:45",
  },
  {
    id: 4,
    fecha: "2024-12-17",
    puerto: "Puerto Quetzal S.A.",
    tipoEnvio: "Manifiesto de Carga",
    cantidad: 52,
    estado: "exitoso",
    horaUltimoEnvio: "16:20:30",
  },
  {
    id: 5,
    fecha: "2024-12-17",
    puerto: "Empresa Portuaria Nacional",
    tipoEnvio: "Estadísticas Portuarias",
    cantidad: 8,
    estado: "fallido",
    horaUltimoEnvio: "11:30:15",
  },
  {
    id: 6,
    fecha: "2024-12-17",
    puerto: "Terminal Especializada de Contenedores",
    tipoEnvio: "Notificación de Salida",
    cantidad: 33,
    estado: "exitoso",
    horaUltimoEnvio: "15:45:20",
  },
  {
    id: 7,
    fecha: "2024-12-16",
    puerto: "Puerto Santo Tomás de Castilla",
    tipoEnvio: "Manifiesto de Carga",
    cantidad: 41,
    estado: "exitoso",
    horaUltimoEnvio: "17:10:55",
  },
  {
    id: 8,
    fecha: "2024-12-16",
    puerto: "Terminal de Contenedores del Pacífico",
    tipoEnvio: "Estadísticas de Contenedores",
    cantidad: 19,
    estado: "parcial",
    horaUltimoEnvio: "10:25:40",
  },
]

const puertosOptions = [
  "Puerto Quetzal S.A.",
  "Terminal de Contenedores del Pacífico",
  "Puerto Santo Tomás de Castilla",
  "Empresa Portuaria Nacional",
  "Terminal Especializada de Contenedores",
]

const tiposEnvioOptions = [
  "Manifiesto de Carga",
  "Estadísticas Portuarias",
  "Notificación de Arribo",
  "Notificación de Salida",
  "Estadísticas de Contenedores",
  "Reporte de Movimientos",
]

export default function InteroperabilityReportsPage() {
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [puertoFilter, setPuertoFilter] = useState("todos")
  const [tipoEnvioFilter, setTipoEnvioFilter] = useState("todos")
  const [filteredData, setFilteredData] = useState(interoperabilityData)

  // Filtrar datos
  const handleFilter = () => {
    let filtered = interoperabilityData

    if (fechaInicio) {
      filtered = filtered.filter((item) => item.fecha >= fechaInicio)
    }

    if (fechaFin) {
      filtered = filtered.filter((item) => item.fecha <= fechaFin)
    }

    if (puertoFilter !== "todos") {
      filtered = filtered.filter((item) => item.puerto === puertoFilter)
    }

    if (tipoEnvioFilter !== "todos") {
      filtered = filtered.filter((item) => item.tipoEnvio === tipoEnvioFilter)
    }

    setFilteredData(filtered)
  }

  // Calcular estadísticas
  const totalEnvios = filteredData.reduce((sum, item) => sum + item.cantidad, 0)
  const enviosExitosos = filteredData
    .filter((item) => item.estado === "exitoso")
    .reduce((sum, item) => sum + item.cantidad, 0)
  const enviosFallidos = filteredData
    .filter((item) => item.estado === "fallido")
    .reduce((sum, item) => sum + item.cantidad, 0)
  const tasaExito = totalEnvios > 0 ? ((enviosExitosos / totalEnvios) * 100).toFixed(1) : "0"

  const handleExportReport = () => {
    console.log("[v0] Exportando reporte de interoperabilidad")
  }

  const getStatusBadge = (estado: string) => {
    const variants = {
      exitoso: "default",
      fallido: "destructive",
      parcial: "secondary",
    } as const

    return (
      <Badge variant={variants[estado as keyof typeof variants] || "secondary"}>
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Reportes de Interoperabilidad</h1>
              <p className="text-muted-foreground mt-2">
                Recuento de información recibida por CPN a través de la interoperabilidad por fechas, puertos y tipos de
                envío
              </p>
            </div>
            <Button onClick={handleExportReport} className="bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Exportar Reporte
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Fecha Inicio</label>
                <Input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Fecha Fin</label>
                <Input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Puerto</label>
                <Select value={puertoFilter} onValueChange={setPuertoFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los Puertos</SelectItem>
                    {puertosOptions.map((puerto) => (
                      <SelectItem key={puerto} value={puerto}>
                        {puerto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Tipo de Envío</label>
                <Select value={tipoEnvioFilter} onValueChange={setTipoEnvioFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los Tipos</SelectItem>
                    {tiposEnvioOptions.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleFilter} className="bg-primary hover:bg-primary/90 w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFechaInicio("")
                    setFechaFin("")
                    setPuertoFilter("todos")
                    setTipoEnvioFilter("todos")
                    setFilteredData(interoperabilityData)
                  }}
                  className="w-full"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Envíos</p>
                  <p className="text-2xl font-bold text-card-foreground">{totalEnvios.toLocaleString()}</p>
                </div>
                <Send className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Envíos Exitosos</p>
                  <p className="text-2xl font-bold text-green-600">{enviosExitosos.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Envíos Fallidos</p>
                  <p className="text-2xl font-bold text-red-600">{enviosFallidos.toLocaleString()}</p>
                </div>
                <Activity className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasa de Éxito</p>
                  <p className="text-2xl font-bold text-card-foreground">{tasaExito}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Reportes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Detalle de Interoperabilidad ({filteredData.length} registros)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Puerto</TableHead>
                    <TableHead>Tipo de Envío</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Envío</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{item.fecha}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span>{item.puerto}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.tipoEnvio}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-lg">{item.cantidad.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.estado)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{item.horaUltimoEnvio}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
