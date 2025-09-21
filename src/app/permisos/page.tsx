"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, X, Users, Shield, UserCheck, Settings } from "lucide-react"

// Datos de ejemplo para usuarios y sus roles
const usersWithRoles = [
  {
    id: 1,
    nombre: "Juan Carlos Pérez",
    correo: "juan.perez@cpn.gob.gt",
    roles: ["Técnico CPN", "Operario Estadístico"],
  },
  {
    id: 2,
    nombre: "María Elena González",
    correo: "maria.gonzalez@empresa-portuaria.com",
    roles: ["Empresa Portuaria"],
  },
  {
    id: 3,
    nombre: "Roberto Martínez",
    correo: "roberto.martinez@cpn.gob.gt",
    roles: ["Seguridad CPN", "Supervisor Estadístico"],
  },
  {
    id: 4,
    nombre: "Ana Sofía López",
    correo: "ana.lopez@cpn.gob.gt",
    roles: ["Supervisor Estadístico", "Administrador CPN"],
  },
]

// Datos de ejemplo para roles y sus usuarios
const rolesWithUsers = [
  {
    id: 1,
    nombre: "Técnico CPN",
    descripcion: "Personal técnico de la Comisión Portuaria Nacional",
    usuarios: ["Juan Carlos Pérez", "Carlos Eduardo Ruiz"],
  },
  {
    id: 2,
    nombre: "Empresa Portuaria",
    descripcion: "Representantes de empresas portuarias",
    usuarios: ["María Elena González", "Luis Fernando Castro"],
  },
  {
    id: 3,
    nombre: "Seguridad CPN",
    descripcion: "Personal de seguridad portuaria",
    usuarios: ["Roberto Martínez"],
  },
  {
    id: 4,
    nombre: "Supervisor Estadístico",
    descripcion: "Supervisores del área estadística",
    usuarios: ["Ana Sofía López", "Roberto Martínez", "Patricia Morales"],
  },
  {
    id: 5,
    nombre: "Administrador CPN",
    descripcion: "Administradores del sistema",
    usuarios: ["Ana Sofía López", "Carlos Eduardo Ruiz"],
  },
]

// Lista de todos los roles disponibles
const availableRoles = [
  "Técnico CPN",
  "Empresa Portuaria",
  "Seguridad CPN",
  "Supervisor Estadístico",
  "Administrador CPN",
  "Operario Estadístico",
  "Sistema",
]

// Lista de todos los usuarios disponibles
const availableUsers = [
  "Juan Carlos Pérez",
  "María Elena González",
  "Roberto Martínez",
  "Ana Sofía López",
  "Carlos Eduardo Ruiz",
  "Luis Fernando Castro",
  "Patricia Morales",
  "Lucía Fernández",
]

export default function PermissionsPage() {
  const [searchType, setSearchType] = useState<"usuario" | "rol">("usuario")
  const [searchValue, setSearchValue] = useState("")
  const [newItemValue, setNewItemValue] = useState("")
  const [selectedData, setSelectedData] = useState<any>(null)

  // Buscar usuario o rol
  const handleSearch = () => {
    if (!searchValue.trim()) return

    if (searchType === "usuario") {
      const user = usersWithRoles.find(
        (u) =>
          u.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
          u.correo.toLowerCase().includes(searchValue.toLowerCase()),
      )
      setSelectedData(user)
    } else {
      const role = rolesWithUsers.find((r) => r.nombre.toLowerCase().includes(searchValue.toLowerCase()))
      setSelectedData(role)
    }
  }

  // Remover rol de usuario o usuario de rol
  const handleRemoveItem = (item: string) => {
    console.log(`Removiendo ${item} de ${selectedData?.nombre}`)
    // Aquí iría la lógica para remover
  }

  // Agregar nuevo rol a usuario o usuario a rol
  const handleAddItem = () => {
    if (!newItemValue.trim()) return

    console.log(`Agregando ${newItemValue} a ${selectedData?.nombre}`)
    setNewItemValue("")
    // Aquí iría la lógica para agregar
  }

  const getAvailableItems = () => {
    if (searchType === "usuario") {
      return availableRoles.filter((role) => !selectedData?.roles?.includes(role))
    } else {
      return availableUsers.filter((user) => !selectedData?.usuarios?.includes(user))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Mantenimiento de Permisos</h1>
              <p className="text-muted-foreground mt-2">Gestiona roles de usuarios y usuarios por rol</p>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              <Settings className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Búsqueda */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Búsqueda de {searchType === "usuario" ? "Usuario" : "Rol"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                value={searchType}
                onValueChange={(value: "usuario" | "rol") => {
                  setSearchType(value)
                  setSearchValue("")
                  setSelectedData(null)
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usuario">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Usuario
                    </div>
                  </SelectItem>
                  <SelectItem value="rol">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Rol
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={`Buscar ${searchType}...`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchValue("")
                  setSelectedData(null)
                  setNewItemValue("")
                }}
              >
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        {selectedData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información del usuario/rol seleccionado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {searchType === "usuario" ? (
                    <>
                      <UserCheck className="w-5 h-5" />
                      Información del Usuario
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Información del Rol
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                    <p className="text-lg font-semibold">{selectedData.nombre}</p>
                  </div>

                  {searchType === "usuario" && selectedData.correo && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Correo</label>
                      <p className="text-sm">{selectedData.correo}</p>
                    </div>
                  )}

                  {searchType === "rol" && selectedData.descripcion && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Descripción</label>
                      <p className="text-sm">{selectedData.descripcion}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {searchType === "usuario" ? "Roles Asignados" : "Usuarios Asignados"}
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(searchType === "usuario" ? selectedData.roles : selectedData.usuarios)?.map(
                        (item: string, index: number) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {item}
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agregar nuevos elementos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Agregar {searchType === "usuario" ? "Rol" : "Usuario"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {searchType === "usuario" ? "Nuevo Rol" : "Nuevo Usuario"}
                    </label>
                    <div className="flex gap-2 mt-2">
                      <Select value={newItemValue} onValueChange={setNewItemValue}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Seleccionar ${searchType === "usuario" ? "rol" : "usuario"}...`} />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableItems().map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleAddItem}
                        disabled={!newItemValue}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {searchType === "usuario" ? "Roles Disponibles" : "Usuarios Disponibles"}
                    </label>
                    <div className="max-h-40 overflow-y-auto mt-2 space-y-1">
                      {getAvailableItems().map((item, index) => (
                        <div
                          key={index}
                          className="text-sm p-2 rounded border cursor-pointer hover:bg-muted"
                          onClick={() => setNewItemValue(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Estado inicial */}
        {!selectedData && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  {searchType === "usuario" ? (
                    <Users className="w-8 h-8 text-muted-foreground" />
                  ) : (
                    <Shield className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">Buscar {searchType === "usuario" ? "Usuario" : "Rol"}</h3>
                <p className="text-muted-foreground">
                  Selecciona el tipo de búsqueda y ingresa el {searchType} para gestionar sus permisos
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
