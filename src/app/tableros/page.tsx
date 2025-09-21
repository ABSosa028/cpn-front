"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Download,
  BarChart3,
  Ship,
  Container,
  Package,
  FileText,
  PieChart,
  LineChart,
  Filter,
  RefreshCw,
} from "lucide-react"

// Datos de ejemplo para el dashboard
const dashboardData = {
  cargaGraneles: {
    total: 125000,
    variacion: "+12.5%",
    datos: [
      { puerto: "Puerto Quetzal", cantidad: 45000, porcentaje: 36 },
      { puerto: "Santo Tomás", cantidad: 38000, porcentaje: 30.4 },
      { puerto: "Puerto Barrios", cantidad: 42000, porcentaje: 33.6 },
    ],
  },
  cargaBuques: {
    total: 342,
    variacion: "+8.2%",
    datos: [
      { tipo: "Graneleros", cantidad: 156, porcentaje: 45.6 },
      { tipo: "Contenedores", cantidad: 98, porcentaje: 28.7 },
      { tipo: "Carga General", cantidad: 88, porcentaje: 25.7 },
    ],
  },
  cargaContenedores: {
    total: 89500,
    variacion: "+15.3%",
    datos: [
      { estado: "Llenos", cantidad: 52000, porcentaje: 58.1 },
      { estado: "Vacíos", cantidad: 37500, porcentaje: 41.9 },
    ],
  },
}

const puertosOptions = [
  "Puerto Quetzal S.A.",
  "Puerto Santo Tomás de Castilla",
  "Puerto Barrios",
  "Terminal de Contenedores del Pacífico",
  "Empresa Portuaria Nacional",
]

const tiposCargaOptions = ["Carga Graneles", "Carga Buques", "Carga Contenedores"]

export default function DashboardsPage() {
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [puertoFilter, setPuertoFilter] = useState("todos")
  const [tipoCargaFilter, setTipoCargaFilter] = useState("todos")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleFilter = () => {
    console.log("[v0] Aplicando filtros al dashboard")
    // Lógica de filtrado aquí
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    console.log("[v0] Actualizando datos del dashboard")
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const handleExportDashboard = () => {
    console.log("[v0] Exportando dashboard completo")
  }

  const navigateToDetailedReport = (reportType: string) => {
    console.log(`[v0] Navegando a reporte detallado: ${reportType}`)
    // Aquí se navegaría a los reportes específicos
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Tablero Centralizado</h1>
              <p className="text-muted-foreground mt-2">
                Vista integral de reportes: Carga Graneles, Carga Buques y Carga Contenedores
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Actualizando..." : "Actualizar"}
              </Button>
              <Button onClick={handleExportDashboard} className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filtros Globales */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros Globales del Dashboard
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
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Tipo de Carga</label>
                <Select value={tipoCargaFilter} onValueChange={setTipoCargaFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los Tipos</SelectItem>
                    {tiposCargaOptions.map((tipo) => (
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
                  Aplicar Filtros
                </Button>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFechaInicio("")
                    setFechaFin("")
                    setPuertoFilter("todos")
                    setTipoCargaFilter("todos")
                  }}
                  className="w-full"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen Ejecutivo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateToDetailedReport("graneles")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Carga Graneles</p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {dashboardData.cargaGraneles.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium">{dashboardData.cargaGraneles.variacion}</p>
                </div>
                <Package className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                {dashboardData.cargaGraneles.datos.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{item.puerto}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.cantidad.toLocaleString()}</span>
                      <Badge variant="secondary">{item.porcentaje}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateToDetailedReport("buques")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Carga Buques</p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {dashboardData.cargaBuques.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium">{dashboardData.cargaBuques.variacion}</p>
                </div>
                <Ship className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                {dashboardData.cargaBuques.datos.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{item.tipo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.cantidad.toLocaleString()}</span>
                      <Badge variant="secondary">{item.porcentaje}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateToDetailedReport("contenedores")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Carga Contenedores</p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {dashboardData.cargaContenedores.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium">{dashboardData.cargaContenedores.variacion}</p>
                </div>
                <Container className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                {dashboardData.cargaContenedores.datos.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{item.estado}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.cantidad.toLocaleString()}</span>
                      <Badge variant="secondary">{item.porcentaje}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualizaciones Interactivas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Distribución por Puerto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Gráfico de Barras Interactivo</p>
                  <p className="text-sm text-muted-foreground">Distribución de carga por puerto</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Tipos de Carga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Gráfico Circular Interactivo</p>
                  <p className="text-sm text-muted-foreground">Proporción por tipo de carga</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tendencias Temporales */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Tendencias Temporales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <LineChart className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Gráfico de Líneas Interactivo</p>
                <p className="text-sm text-muted-foreground">Evolución temporal de los tres tipos de carga</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Haga clic en las líneas para filtrar por tipo de carga
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accesos Rápidos a Reportes Detallados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Acceso a Reportes Detallados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-transparent"
                onClick={() => navigateToDetailedReport("graneles")}
              >
                <Package className="w-8 h-8" />
                <span>Reporte Carga Graneles</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-transparent"
                onClick={() => navigateToDetailedReport("buques")}
              >
                <Ship className="w-8 h-8" />
                <span>Reporte Carga Buques</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-transparent"
                onClick={() => navigateToDetailedReport("contenedores")}
              >
                <Container className="w-8 h-8" />
                <span>Reporte Carga Contenedores</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
