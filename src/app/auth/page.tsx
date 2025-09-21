"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Key,
  Shield,
  Building2,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para credenciales OAuth
const oauthCredentials = [
  {
    id: 1,
    empresaPortuaria: "Puerto Quetzal S.A.",
    clientId: "pq_client_2024_001",
    clientSecret: "••••••••••••••••••••••••••••••••",
    redirectUri: "https://api.puertoquetzal.com/oauth/callback",
    scopes: ["read:statistics", "write:manifests", "read:ports"],
    estado: "activo",
    fechaCreacion: "2024-01-15",
    fechaExpiracion: "2025-01-15",
    ultimoUso: "2024-12-18",
  },
  {
    id: 2,
    empresaPortuaria: "Terminal de Contenedores del Pacífico",
    clientId: "tcp_client_2024_002",
    clientSecret: "••••••••••••••••••••••••••••••••",
    redirectUri: "https://tcp.com.gt/api/oauth/callback",
    scopes: ["read:statistics", "read:ports"],
    estado: "activo",
    fechaCreacion: "2024-02-20",
    fechaExpiracion: "2025-02-20",
    ultimoUso: "2024-12-17",
  },
  {
    id: 3,
    empresaPortuaria: "Puerto Santo Tomás de Castilla",
    clientId: "pstc_client_2024_003",
    clientSecret: "••••••••••••••••••••••••••••••••",
    redirectUri: "https://pstc.gob.gt/oauth/callback",
    scopes: ["read:statistics", "write:manifests", "read:ports", "write:statistics"],
    estado: "inactivo",
    fechaCreacion: "2024-03-10",
    fechaExpiracion: "2025-03-10",
    ultimoUso: "2024-11-30",
  },
  {
    id: 4,
    empresaPortuaria: "Empresa Portuaria Nacional",
    clientId: "epn_client_2024_004",
    clientSecret: "••••••••••••••••••••••••••••••••",
    redirectUri: "https://epn.com.gt/api/oauth/callback",
    scopes: ["read:statistics"],
    estado: "expirado",
    fechaCreacion: "2023-12-01",
    fechaExpiracion: "2024-12-01",
    ultimoUso: "2024-11-28",
  },
  {
    id: 5,
    empresaPortuaria: "Terminal Especializada de Contenedores",
    clientId: "tec_client_2024_005",
    clientSecret: "••••••••••••••••••••••••••••••••",
    redirectUri: "https://tec-gt.com/oauth/callback",
    scopes: ["read:statistics", "write:manifests"],
    estado: "suspendido",
    fechaCreacion: "2024-05-15",
    fechaExpiracion: "2025-05-15",
    ultimoUso: "2024-10-15",
  },
]

const scopesOptions = [
  "read:statistics",
  "write:statistics",
  "read:manifests",
  "write:manifests",
  "read:ports",
  "write:ports",
  "read:users",
  "admin:all",
]

export default function OAuthCredentialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [filteredCredentials, setFilteredCredentials] = useState(oauthCredentials)

  // Filtrar credenciales
  const handleFilter = () => {
    let filtered = oauthCredentials

    if (searchTerm) {
      filtered = filtered.filter(
        (cred) =>
          cred.empresaPortuaria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cred.clientId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((cred) => cred.estado === statusFilter)
    }

    setFilteredCredentials(filtered)
  }

  // Acciones de credenciales
  const handleViewCredential = (id: number) => {
    console.log("[v0] Viendo credencial:", id)
  }

  const handleEditCredential = (id: number) => {
    console.log("[v0] Editando credencial:", id)
  }

  const handleRegenerateSecret = (id: number) => {
    console.log("[v0] Regenerando client secret:", id)
  }

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "activo" ? "inactivo" : "activo"
    console.log("[v0] Cambiando estado de credencial:", id, "a", newStatus)
  }

  const handleDeleteCredential = (id: number) => {
    console.log("[v0] Eliminando credencial:", id)
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("[v0] Copiado al portapapeles:", text)
  }

  const getStatusBadge = (estado: string) => {
    const variants = {
      activo: "default",
      inactivo: "secondary",
      expirado: "destructive",
      suspendido: "outline",
    } as const

    const icons = {
      activo: CheckCircle,
      inactivo: XCircle,
      expirado: Clock,
      suspendido: XCircle,
    }

    const Icon = icons[estado as keyof typeof icons] || CheckCircle

    return (
      <Badge variant={variants[estado as keyof typeof variants] || "secondary"} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
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
              <h1 className="text-3xl font-bold text-card-foreground">Credenciales OAuth 2.0</h1>
              <p className="text-muted-foreground mt-2">
                Gestiona las credenciales de autenticación para usuarios externos y empresas portuarias
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Credencial
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar empresa o client ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleFilter()}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Estados</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="expirado">Expirado</SelectItem>
                  <SelectItem value="suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleFilter} className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Filtrar
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("todos")
                  setFilteredCredentials(oauthCredentials)
                }}
              >
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Credenciales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Credenciales OAuth ({filteredCredentials.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa Portuaria</TableHead>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Scopes</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Expiración</TableHead>
                    <TableHead>Último Uso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCredentials.map((credential) => (
                    <TableRow key={credential.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{credential.empresaPortuaria}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded">{credential.clientId}</code>
                          <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(credential.clientId)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {credential.scopes.slice(0, 2).map((scope, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                          {credential.scopes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{credential.scopes.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(credential.estado)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {credential.fechaExpiracion}
                          {credential.estado === "expirado" && <div className="text-xs text-destructive">Expirado</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{credential.ultimoUso}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCredential(credential.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCredential(credential.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRegenerateSecret(credential.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Regenerar Secret
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleStatus(credential.id, credential.estado)}>
                              <Shield className="mr-2 h-4 w-4" />
                              {credential.estado === "activo" ? "Desactivar" : "Activar"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteCredential(credential.id)}
                              className="text-destructive"
                            >
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
