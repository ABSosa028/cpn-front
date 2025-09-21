"use client"

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Filter } from "lucide-react";

interface CatalogItem {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  estado: "activo" | "inactivo";
  fechaCreacion: string;
  precio?: number;
}

export default function MantenimientoCatalogos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([
    {
      id: 1,
      codigo: "PROD001",
      nombre: "Producto Premium A",
      categoria: "Electrónicos",
      estado: "activo",
      fechaCreacion: "2024-01-15",
      precio: 299.99
    },
    {
      id: 2,
      codigo: "PROD002", 
      nombre: "Servicio Básico B",
      categoria: "Servicios",
      estado: "activo",
      fechaCreacion: "2024-01-20",
      precio: 149.50
    },
    {
      id: 3,
      codigo: "PROD003",
      nombre: "Producto Descontinuado",
      categoria: "Hogar",
      estado: "inactivo",
      fechaCreacion: "2023-12-10",
      precio: 89.99
    },
    {
      id: 4,
      codigo: "SERV001",
      nombre: "Consultoría Especializada",
      categoria: "Servicios",
      estado: "activo",
      fechaCreacion: "2024-02-01",
      precio: 500.00
    },
    {
      id: 5,
      codigo: "ELEC001",
      nombre: "Smartphone Pro Max",
      categoria: "Electrónicos",
      estado: "activo",
      fechaCreacion: "2024-01-30",
      precio: 899.99
    }
  ]);

  const categories = ["todas", "Electrónicos", "Servicios", "Hogar"];

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todas" || item.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeItemsCount = catalogItems.filter(item => item.estado === "activo").length;
  const totalValue = catalogItems.reduce((sum, item) => sum + (item.precio || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mantenimiento de Catálogos</h1>
            <p className="text-muted-foreground">
              Gestiona productos, servicios y elementos del catálogo
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">
                ← Volver al Home
              </Button>
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{catalogItems.length}</div>
              <p className="text-xs text-muted-foreground">
                En el catálogo
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeItemsCount}</div>
              <p className="text-xs text-muted-foreground">
                Disponibles para venta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length - 1}</div>
              <p className="text-xs text-muted-foreground">
                Diferentes categorías
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Inventario total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "todas" ? "Todas las categorías" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Elementos del Catálogo</CardTitle>
            <CardDescription>
              {filteredItems.length} elementos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Creación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell>${item.precio?.toFixed(2) || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant={item.estado === "activo" ? "default" : "secondary"}>
                        {item.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.fechaCreacion}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No se encontraron elementos que coincidan con los filtros.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Operaciones comunes del catálogo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  Exportar Catálogo
                </Button>
                <Button variant="outline">
                  Importar Items
                </Button>
                <Button variant="outline">
                  Generar Reporte
                </Button>
                <Button variant="outline">
                  Configurar Categorías
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
