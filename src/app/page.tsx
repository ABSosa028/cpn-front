import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a tu App</h1>
          <p className="text-muted-foreground text-lg">
            Navega a las diferentes secciones de tu aplicación
          </p>
        </div>
        
        {/* Sección de Gestión de Catálogos */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">📋 Gestión de Catálogos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Mantenimiento de Catálogos</CardTitle>
                <CardDescription>
                  Gestiona productos, servicios y elementos del catálogo empresarial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/mant-catalogos">
                  <Button className="w-full">
                    Acceder a Catálogos
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Elementos Catálogos</CardTitle>
                <CardDescription>
                  Gestiona los elementos de un catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/opc-catalogos">
                  <Button className="w-full">
                    Elementos Catálogos
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Incisos Arancelarios</CardTitle>
                <CardDescription>
                  Gestiona los incisos arancelarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/incisos-arancelarios">
                  <Button className="w-full">
                    Incisos Arancelarios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de Gestión de Usuarios y Seguridad */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">👥 Usuarios y Seguridad</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Autenticación</CardTitle>
                <CardDescription>
                  Sistema de autenticación para credenciales de empresas portuarias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth">
                  <Button className="w-full">
                    Autenticación
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Usuarios</CardTitle>
                <CardDescription>
                  Gestiona los usuarios del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/usuarios">
                  <Button className="w-full">
                    Usuarios
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>
                  Gestiona los roles del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/roles">
                  <Button className="w-full">
                    Roles
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Permisos</CardTitle>
                <CardDescription>
                  Gestiona permisos y accesos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/permisos">
                  <Button className="w-full">
                    Permisos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de Operaciones Portuarias */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">🚢 Operaciones Portuarias</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Puertos</CardTitle>
                <CardDescription>
                  Gestiona información de puertos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/puertos">
                  <Button className="w-full">
                    Puertos
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Buques</CardTitle>
                <CardDescription>
                  Gestiona información de buques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/bukes">
                  <Button className="w-full">
                    Buques
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Contenedores</CardTitle>
                <CardDescription>
                  Gestiona contenedores y carga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contenedores">
                  <Button className="w-full">
                    Contenedores
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Gestión de Carga</CardTitle>
                <CardDescription>
                  Administra la carga y mercancías
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/carga">
                  <Button className="w-full">
                    Gestión de Carga
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de Herramientas y Reportes */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">📊 Herramientas y Reportes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Tableros</CardTitle>
                <CardDescription>
                  Dashboards y métricas del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/tableros">
                  <Button className="w-full">
                    Tableros
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Interfaz</CardTitle>
                <CardDescription>
                  Herramientas de interfaz del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/inter">
                  <Button className="w-full">
                    Interfaz
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Componentes Demo</CardTitle>
                <CardDescription>
                  Demostración de componentes UI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/component">
                  <Button className="w-full" variant="secondary">
                    Ver Componentes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
