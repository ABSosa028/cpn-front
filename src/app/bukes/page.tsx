"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, PieChart, Database, Download, RefreshCw, Filter, Ship } from "lucide-react"

export default function ShipsReportPage() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedPort, setSelectedPort] = useState("")
  const [selectedCargoType, setSelectedCargoType] = useState("")
  const [selectedShip, setSelectedShip] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState("2024-01-15 14:30:00")

  const cargoByShip = [
    { ship: "MV Oceanic Star", volume: 15000, trips: 3, efficiency: 95 },
    { ship: "MV Caribbean Express", volume: 12500, trips: 2, efficiency: 88 },
    { ship: "MV Atlantic Cargo", volume: 18000, trips: 4, efficiency: 92 },
    { ship: "MV Pacific Trader", volume: 9500, trips: 2, efficiency: 85 },
    { ship: "MV Gulf Navigator", volume: 14200, trips: 3, efficiency: 90 },
  ]

  const trafficTrend = [
    { month: "Ene", volume: 45000, ships: 12 },
    { month: "Feb", volume: 52000, ships: 14 },
    { month: "Mar", volume: 48000, ships: 13 },
    { month: "Abr", volume: 58000, ships: 16 },
    { month: "May", volume: 55000, ships: 15 },
    { month: "Jun", volume: 62000, ships: 18 },
  ]

  const shipTypeDistribution = [
    { type: "Graneleros", percentage: 40, count: 8, volume: 28000 },
    { type: "Portacontenedores", percentage: 35, count: 7, volume: 24500 },
    { type: "Tanqueros", percentage: 15, count: 3, volume: 10500 },
    { type: "Carga General", percentage: 10, count: 2, volume: 7000 },
  ]

  const shipMovements = [
    {
      ship: "MV Oceanic Star",
      type: "Graneleros",
      cargo: "Cereales",
      port: "Puerto Cortés",
      volume: 5000,
      date: "2024-01-15",
      destination: "Miami",
    },
    {
      ship: "MV Caribbean Express",
      type: "Portacontenedores",
      cargo: "Contenedores",
      port: "Puerto Castilla",
      volume: 6250,
      date: "2024-01-14",
      destination: "New Orleans",
    },
    {
      ship: "MV Atlantic Cargo",
      type: "Graneleros",
      cargo: "Minerales",
      port: "Puerto Cortés",
      volume: 4500,
      date: "2024-01-14",
      destination: "Houston",
    },
    {
      ship: "MV Pacific Trader",
      type: "Tanqueros",
      cargo: "Combustible",
      port: "La Ceiba",
      volume: 4750,
      date: "2024-01-13",
      destination: "Tampa",
    },
    {
      ship: "MV Gulf Navigator",
      type: "Carga General",
      cargo: "Manufacturas",
      port: "Tela",
      volume: 4730,
      date: "2024-01-13",
      destination: "Mobile",
    },
  ]

  const handleRefresh = () => {
    setLastUpdate(new Date().toLocaleString())
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Reporte - Buques</h1>
            <p className="text-slate-400 mt-2">Dashboard Power BI para análisis de movimientos de carga de buques</p>
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

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Preparación y Conexión de Datos de Buques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">Activa</div>
                <div className="text-sm text-slate-400">Conexión BD</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{lastUpdate}</div>
                <div className="text-sm text-slate-400">Última Actualización</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">18 Buques</div>
                <div className="text-sm text-slate-400">Total Activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">69,200 T</div>
                <div className="text-sm text-slate-400">Carga Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros y Opciones de Segmentación
            </CardTitle>
            <CardDescription className="text-slate-400">
              Personaliza las visualizaciones por fechas, puertos, tipos de carga y buques específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    <SelectItem value="contenedores">Contenedores</SelectItem>
                    <SelectItem value="minerales">Minerales</SelectItem>
                    <SelectItem value="combustible">Combustible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Buque Específico</label>
                <Select value={selectedShip} onValueChange={setSelectedShip}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Seleccionar buque" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="oceanic-star">MV Oceanic Star</SelectItem>
                    <SelectItem value="caribbean-express">MV Caribbean Express</SelectItem>
                    <SelectItem value="atlantic-cargo">MV Atlantic Cargo</SelectItem>
                    <SelectItem value="pacific-trader">MV Pacific Trader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Cantidad de Carga por Buque */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Cantidad de Carga por Buque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cargoByShip.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.ship}</span>
                      <div className="text-right">
                        <div className="text-slate-100 font-medium">{item.volume.toLocaleString()} T</div>
                        <div className="text-xs text-slate-400">
                          {item.trips} viajes • {item.efficiency}% eficiencia
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(item.volume / 18000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Líneas - Tráfico de Carga por Buque a lo largo del Tiempo */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tráfico de Carga Temporal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Volumen mensual y número de buques</span>
                  <Badge className="bg-emerald-600">↗ +15% vs mes anterior</Badge>
                </div>
                <div className="space-y-3">
                  {trafficTrend.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 text-xs text-slate-400">{item.month}</div>
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.volume / 62000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-300 w-20 text-right">
                        {item.volume.toLocaleString()} T<div className="text-slate-500">{item.ships} buques</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Pie - Distribución Porcentual por Tipos de Buques */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Distribución por Tipos de Buques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipTypeDistribution.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.type}</span>
                      <div className="text-right">
                        <div className="text-slate-100 font-medium">{item.percentage}%</div>
                        <div className="text-xs text-slate-400">
                          {item.count} buques • {item.volume.toLocaleString()} T
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          index === 0
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : index === 1
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                              : index === 2
                                ? "bg-gradient-to-r from-amber-500 to-amber-600"
                                : "bg-gradient-to-r from-purple-500 to-purple-600"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Publicación y Acceso */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Ship className="w-5 h-5" />
                Publicación y Acceso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-400">Publicado</div>
                    <div className="text-sm text-slate-400">Estado del Reporte</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-sm text-slate-400">Usuarios con Acceso</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Reporte Completo
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Gestionar Permisos de Acceso
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Movimientos Detallados de Buques</CardTitle>
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
                  <TableHead className="text-slate-300">Tipo de Buque</TableHead>
                  <TableHead className="text-slate-300">Tipo de Carga</TableHead>
                  <TableHead className="text-slate-300">Puerto</TableHead>
                  <TableHead className="text-slate-300">Volumen (T)</TableHead>
                  <TableHead className="text-slate-300">Destino</TableHead>
                  <TableHead className="text-slate-300">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipMovements.map((movement, index) => (
                  <TableRow key={index} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="text-slate-100 font-medium">{movement.ship}</TableCell>
                    <TableCell className="text-slate-300">{movement.type}</TableCell>
                    <TableCell className="text-slate-300">{movement.cargo}</TableCell>
                    <TableCell className="text-slate-300">{movement.port}</TableCell>
                    <TableCell className="text-slate-300">{movement.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-slate-300">{movement.destination}</TableCell>
                    <TableCell className="text-slate-300">{movement.date}</TableCell>
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
