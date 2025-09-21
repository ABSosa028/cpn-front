"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, Map, Database, Download, RefreshCw, Filter } from "lucide-react"

export default function BulkCargoPowerBIPage() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedPort, setSelectedPort] = useState("")
  const [selectedCargoType, setSelectedCargoType] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState("2024-01-15 14:30:00")

  // Datos simulados para las visualizaciones
  const cargoByType = [
    { type: "Cereales", volume: 45000, percentage: 35 },
    { type: "Minerales", volume: 38000, percentage: 30 },
    { type: "Carbón", volume: 25000, percentage: 20 },
    { type: "Fertilizantes", volume: 19000, percentage: 15 },
  ]

  const cargoByPort = [
    { port: "Puerto Cortés", volume: 52000, ships: 12 },
    { port: "Puerto Castilla", volume: 38000, ships: 8 },
    { port: "La Ceiba", volume: 25000, ships: 6 },
    { port: "Tela", volume: 12000, ships: 3 },
  ]

  const trendData = [
    { month: "Ene", volume: 42000 },
    { month: "Feb", volume: 38000 },
    { month: "Mar", volume: 45000 },
    { month: "Abr", volume: 52000 },
    { month: "May", volume: 48000 },
    { month: "Jun", volume: 55000 },
  ]

  const shipDetails = [
    { ship: "MV Granelero I", type: "Cereales", port: "Puerto Cortés", volume: 8500, date: "2024-01-15" },
    { ship: "MV Mineral Star", type: "Minerales", port: "Puerto Castilla", volume: 12000, date: "2024-01-14" },
    { ship: "MV Carbon Express", type: "Carbón", port: "Puerto Cortés", volume: 9500, date: "2024-01-14" },
    { ship: "MV Fertilizer Pro", type: "Fertilizantes", volume: 7200, port: "La Ceiba", date: "2024-01-13" },
  ]

  const handleRefresh = () => {
    setLastUpdate(new Date().toLocaleString())
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Reporte de Carga Graneles (Power BI)</h1>
            <p className="text-slate-400 mt-2">Dashboard interactivo para análisis de carga de graneles</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isConnected ? "default" : "destructive"} className="bg-emerald-600">
              <Database className="w-4 h-4 mr-2" />
              {isConnected ? "Conectado" : "Desconectado"}
            </Badge>
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Estado de Conexión con Base de Datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">Activa</div>
                <div className="text-sm text-slate-400">Conexión BD</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{lastUpdate}</div>
                <div className="text-sm text-slate-400">Última Actualización</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">127,000 T</div>
                <div className="text-sm text-slate-400">Total Procesado</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros y Slicers */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros y Slicers
            </CardTitle>
            <CardDescription className="text-slate-400">
              Personaliza las visualizaciones según tus necesidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Fecha Desde</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Fecha Hasta</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Puerto</label>
                <Select value={selectedPort} onValueChange={setSelectedPort}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Seleccionar puerto" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="puerto-cortes">Puerto Cortés</SelectItem>
                    <SelectItem value="puerto-castilla">Puerto Castilla</SelectItem>
                    <SelectItem value="la-ceiba">La Ceiba</SelectItem>
                    <SelectItem value="tela">Tela</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tipo de Carga</label>
                <Select value={selectedCargoType} onValueChange={setSelectedCargoType}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="cereales">Cereales</SelectItem>
                    <SelectItem value="minerales">Minerales</SelectItem>
                    <SelectItem value="carbon">Carbón</SelectItem>
                    <SelectItem value="fertilizantes">Fertilizantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visualizaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfica de Barras - Volumen por Tipo de Carga */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Volumen por Tipo de Carga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cargoByType.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.type}</span>
                      <span className="text-slate-100 font-medium">{item.volume.toLocaleString()} T</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfica de Barras - Volumen por Puerto */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Volumen por Puerto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cargoByPort.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.port}</span>
                      <div className="text-right">
                        <div className="text-slate-100 font-medium">{item.volume.toLocaleString()} T</div>
                        <div className="text-xs text-slate-400">{item.ships} buques</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(item.volume / 55000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfica de Líneas - Tendencias Temporales */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendencias de Carga (6 meses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Volumen mensual (Toneladas)</span>
                  <Badge className="bg-emerald-600">↗ +12% vs mes anterior</Badge>
                </div>
                <div className="space-y-3">
                  {trendData.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 text-xs text-slate-400">{item.month}</div>
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.volume / 55000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-300 w-16 text-right">{item.volume.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa de Calor - Concentración por Puertos */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Mapa de Calor - Concentración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {cargoByPort.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        item.volume > 40000
                          ? "bg-red-900/30 border-red-700"
                          : item.volume > 25000
                            ? "bg-amber-900/30 border-amber-700"
                            : "bg-blue-900/30 border-blue-700"
                      }`}
                    >
                      <div className="text-sm font-medium text-slate-200">{item.port}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.volume.toLocaleString()} T</div>
                      <div className="text-xs text-slate-500">
                        Intensidad: {item.volume > 40000 ? "Alta" : item.volume > 25000 ? "Media" : "Baja"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Baja</span>
                  <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-blue-600 via-amber-600 to-red-600 rounded-full" />
                  <span>Alta</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla Detallada por Buques */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Detalle por Buques</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead className="text-slate-300">Buque</TableHead>
                  <TableHead className="text-slate-300">Tipo de Carga</TableHead>
                  <TableHead className="text-slate-300">Puerto</TableHead>
                  <TableHead className="text-slate-300">Volumen (T)</TableHead>
                  <TableHead className="text-slate-300">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipDetails.map((ship, index) => (
                  <TableRow key={index} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="text-slate-100 font-medium">{ship.ship}</TableCell>
                    <TableCell className="text-slate-300">{ship.type}</TableCell>
                    <TableCell className="text-slate-300">{ship.port}</TableCell>
                    <TableCell className="text-slate-300">{ship.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-slate-300">{ship.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
