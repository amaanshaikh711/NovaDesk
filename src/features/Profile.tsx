import { Card, CardContent, CardHeader, CardTitle, Input, Button } from '../components';

export function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <Input defaultValue="Amaan Shaikh" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <Input defaultValue="amaan@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Joining</label>
                  <Input defaultValue="January 15, 2023" disabled />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Stats */}
        <div>
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <CardContent className="-mt-16 text-center pb-8">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-950 mx-auto bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                AS
              </div>
              <h3 className="mt-4 text-xl font-bold">Amaan Shaikh</h3>
              <p className="text-gray-500 dark:text-gray-400">Frontend Developer</p>

              <div className="grid grid-cols-3 gap-2 mt-6 px-4">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">1.5</p>
                  <p className="text-xs text-gray-500">Years</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
                  <p className="text-xs text-gray-500">Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
