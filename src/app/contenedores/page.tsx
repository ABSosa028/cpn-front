"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart3,
  TrendingUp,
  Scale3D as Scatter3D,
  Database,
  Download,
  RefreshCw,
  Filter,
  Container,
} from "lucide-react"

export default function ContainersReportPage() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedPort, setSelectedPort] = useState("")
  const [selectedContainerType, setSelectedContainerType] = useState("")
  const [selectedShip, setSelectedShip] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState("2024-01-15 14:30:00")

  const cargoByContainer = [
    { type: "20' Standard", quantity: 1250, volume: 18750, efficiency: 94 },
    { type: "40' Standard", quantity: 980, volume: 29400, efficiency: 91 },
    { type: "40' High Cube", quantity: 750, volume: 26250, efficiency: 88 },
    { type: "20' Refrigerated", quantity: 420, volume: 6300, efficiency: 96 },
    { type: "40' Refrigerated", quantity: 320, volume: 9600, efficiency: 93 },
  ]

  const containerTrend = [
    { month: "Ene", containers: 2800, volume: 84000 },
    { month: "Feb", containers: 3200, volume: 96000 },
    { month: "Mar", containers: 2950, volume: 88500 },
    { month: "Abr", containers: 3500, volume: 105000 },
    { month: "May", containers: 3300, volume: 99000 },
    { month: "Jun", containers: 3720, volume: 111600 },
  ]

  const containerVolumeRelation = [
    { containers: 2800, volume: 84000, port: "Puerto Cortés" },
    { containers: 1200, volume: 36000, port: "Puerto Castilla" },
    { containers: 800, volume: 24000, port: "La Ceiba" },
    { containers: 920, volume: 27600, port: "Tela" },
  ]

  const containerMovements = [
    {
      container: "TCLU-1234567",
      type: "40' Standard",
      cargo: "Textiles",
      ship: "MV Container Express",
      port: "Puerto Cortés",
      volume: 30,
      date: "2024-01-15",
      destination: "Miami",
    },
    {
      container: "MSKU-2345678",
      type: "20' Refrigerated",
      cargo: "Productos Frescos",
      ship: "MV Cold Chain",
      port: "Puerto Castilla",
      volume: 15,
      date: "2024-01-14",
      destination: "New Orleans",
    },
    {
      container: "COSCO-3456789",
      type: "40' High Cube",
      cargo: "Electrónicos",
      ship: "MV Tech Carrier",
      port: "Puerto Cortés",
      volume: 35,
      date: "2024-01-14",
      destination: "Houston",
    },
    {
      container: "HAPAG-4567890",
      type: "20' Standard",
      cargo: "Manufacturas",
      ship: "MV Global Trade",
      port: "La Ceiba",
      volume: 15,
      date: "2024-01-13",
      destination: "Tampa",
    },
    {
      container: "MAERSK-5678901",
      type: "40' Refrigerated",
      cargo: "Productos Congelados",
      ship: "MV Arctic Express",
      port: "Tela",
      volume: 30,
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
            <h1 className="text-3xl font-bold text-balance">Reporte de Carga Contenedores</h1>
            <p className="text-slate-400 mt-2">Dashboard Power BI para análisis de manejo de contenedores</p>
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
              Preparación y Conexión de Datos de Contenedores
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
                <div className="text-2xl font-bold text-amber-400">3,720</div>
                <div className="text-sm text-slate-400">Contenedores Activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">90,300 T</div>
                <div className="text-sm text-slate-400">Volumen Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros y Segmentación de Contenedores
            </CardTitle>
            <CardDescription className="text-slate-400">
              Personaliza las visualizaciones por fechas, puertos, tipos de contenedores y buques
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
                <label className="text-sm font-medium text-slate-300">Tipo de Contenedor</label>
                <Select value={selectedContainerType} onValueChange={setSelectedContainerType}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="20-standard">20' Standard</SelectItem>
                    <SelectItem value="40-standard">40' Standard</SelectItem>
                    <SelectItem value="40-high-cube">40' High Cube</SelectItem>
                    <SelectItem value="20-refrigerated">20' Refrigerated</SelectItem>
                    <SelectItem value="40-refrigerated">40' Refrigerated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Buque Asociado</label>
                <Select value={selectedShip} onValueChange={setSelectedShip}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Seleccionar buque" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="container-express">MV Container Express</SelectItem>
                    <SelectItem value="cold-chain">MV Cold Chain</SelectItem>
                    <SelectItem value="tech-carrier">MV Tech Carrier</SelectItem>
                    <SelectItem value="global-trade">MV Global Trade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Cantidad de Carga por Contenedor */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Cantidad de Carga por Tipo de Contenedor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cargoByContainer.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.type}</span>
                      <div className="text-right">
                        <div className="text-slate-100 font-medium">{item.quantity} unidades</div>
                        <div className="text-xs text-slate-400">
                          {item.volume.toLocaleString()} T • {item.efficiency}% eficiencia
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(item.quantity / 1250) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Líneas - Tendencias en el Manejo de Contenedores */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendencias en el Manejo de Contenedores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Contenedores y volumen mensual</span>
                  <Badge className="bg-emerald-600">↗ +18% vs mes anterior</Badge>
                </div>
                <div className="space-y-3">
                  {containerTrend.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 text-xs text-slate-400">{item.month}</div>
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.containers / 3720) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-300 w-24 text-right">
                        {item.containers.toLocaleString()} cont.
                        <div className="text-slate-500">{item.volume.toLocaleString()} T</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Dispersión - Relación Contenedores vs Volumen */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Scatter3D className="w-5 h-5" />
                Relación Contenedores vs Volumen por Puerto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {containerVolumeRelation.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.port}</span>
                      <div className="text-right">
                        <div className="text-slate-100 font-medium">{item.containers} contenedores</div>
                        <div className="text-xs text-slate-400">
                          {item.volume.toLocaleString()} T • {(item.volume / item.containers).toFixed(1)} T/cont.
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
                        style={{ width: `${(item.containers / 2800) * 100}%` }}
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
                <Container className="w-5 h-5" />
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
                    <div className="text-2xl font-bold text-blue-400">15</div>
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
              <CardTitle className="text-slate-100">Movimientos Detallados de Contenedores</CardTitle>
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
                  <TableHead className="text-slate-300">Contenedor</TableHead>
                  <TableHead className="text-slate-300">Tipo</TableHead>
                  <TableHead className="text-slate-300">Tipo de Carga</TableHead>
                  <TableHead className="text-slate-300">Buque Asociado</TableHead>
                  <TableHead className="text-slate-300">Puerto</TableHead>
                  <TableHead className="text-slate-300">Volumen (T)</TableHead>
                  <TableHead className="text-slate-300">Destino</TableHead>
                  <TableHead className="text-slate-300">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {containerMovements.map((movement, index) => (
                  <TableRow key={index} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="text-slate-100 font-medium font-mono text-xs">{movement.container}</TableCell>
                    <TableCell className="text-slate-300">{movement.type}</TableCell>
                    <TableCell className="text-slate-300">{movement.cargo}</TableCell>
                    <TableCell className="text-slate-300">{movement.ship}</TableCell>
                    <TableCell className="text-slate-300">{movement.port}</TableCell>
                    <TableCell className="text-slate-300">{movement.volume}</TableCell>
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
