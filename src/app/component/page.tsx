import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ComponentPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Componente v0</h1>
            <p className="text-muted-foreground">
              Componente generado con v0 usando shadcn/ui
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">
              ← Volver al Home
            </Button>
          </Link>
        </div>

        {/* Demo Components */}
        <div className="space-y-8">
          {/* Cards Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Componentes de UI</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Ejemplo Card
                    <Badge variant="secondary">Nuevo</Badge>
                  </CardTitle>
                  <CardDescription>
                    Esta es una card de ejemplo usando shadcn/ui
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Los componentes están listos para usar y son completamente personalizables.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Acción</Button>
                    <Button size="sm" variant="outline">Cancelar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Formulario</CardTitle>
                  <CardDescription>
                    Ejemplo de inputs y selects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre</label>
                    <Input placeholder="Ingresa tu nombre" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Categoría</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Fullstack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>
                    Diferentes variantes de badges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Table Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tabla de Datos</h2>
            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuarios</CardTitle>
                <CardDescription>
                  Ejemplo de tabla usando los componentes de shadcn/ui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Juan Pérez</TableCell>
                      <TableCell>juan@example.com</TableCell>
                      <TableCell>Desarrollador</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Activo</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">María García</TableCell>
                      <TableCell>maria@example.com</TableCell>
                      <TableCell>Diseñadora</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Activo</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Carlos López</TableCell>
                      <TableCell>carlos@example.com</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>
                        <Badge variant="outline">Inactivo</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Actions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Acciones</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button>Botón Principal</Button>
                  <Button variant="secondary">Secundario</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructivo</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
