'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Check,
  X,
  Eye,
  Trash2,
  Users,
  Calendar,
  User,
  Mail,
  Phone,
  Clock,
  TrendingUp,
  Download,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FirestoreService, Admission } from '@/lib/firestore-service';

const statusOptions = ['All', 'Pending', 'Approved', 'Rejected', 'Waitlisted'];
const courseOptions = ['All', 'Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi'];

export default function ProfessionalAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [selectedAdmissions, setSelectedAdmissions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        setIsLoading(true);
        const admissionsData = await FirestoreService.getAdmissions();
        setAdmissions(admissionsData);
      } catch (error) {
        console.error('Error fetching admissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = (admission.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (admission.guardianName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (admission.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (admission.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchesCourse = courseFilter === 'All' || (admission.course || '') === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleAdmissionSelect = (admissionId: string) => {
    setSelectedAdmissions(prev => 
      prev.includes(admissionId) 
        ? prev.filter(id => id !== admissionId)
        : [...prev, admissionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAdmissions.length === filteredAdmissions.length) {
      setSelectedAdmissions([]);
    } else {
      setSelectedAdmissions(filteredAdmissions.map(admission => admission.id));
    }
  };

  const handleStatusChange = async (admissionId: string, newStatus: string) => {
    try {
      await FirestoreService.updateAdmissionStatus(admissionId, newStatus as any);
      setAdmissions(prev => prev.map(admission => 
        admission.id === admissionId ? { ...admission, status: newStatus as any } : admission
      ));
    } catch (error) {
      console.error('Error updating admission status:', error);
    }
  };

  const handleDelete = async (admissionId: string) => {
    try {
      await FirestoreService.deleteAdmission(admissionId);
      setAdmissions(prev => prev.filter(admission => admission.id !== admissionId));
    } catch (error) {
      console.error('Error deleting admission:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'waitlisted': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = {
    total: admissions.length,
    pending: admissions.filter(a => a.status === 'pending').length,
    approved: admissions.filter(a => a.status === 'approved').length,
    rejected: admissions.filter(a => a.status === 'rejected').length,
    waitlisted: admissions.filter(a => a.status === 'waitlisted').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admissions Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage student applications and enrollment
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-primary/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Waitlisted</p>
                <p className="text-2xl font-bold text-blue-600">{stats.waitlisted}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <X className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-primary/20 focus:border-primary/40"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48 border-primary/20">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Course Filter */}
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full lg:w-48 border-primary/20">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map(course => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedAdmissions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedAdmissions.length === filteredAdmissions.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium">
                    {selectedAdmissions.length} application{selectedAdmissions.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      setAdmissions(prev => prev.map(admission => 
                        selectedAdmissions.includes(admission.id) ? { ...admission, status: 'approved' as any } : admission
                      ));
                      setSelectedAdmissions([]);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      setAdmissions(prev => prev.map(admission => 
                        selectedAdmissions.includes(admission.id) ? { ...admission, status: 'waitlisted' as any } : admission
                      ));
                      setSelectedAdmissions([]);
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Waitlist All
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setAdmissions(prev => prev.filter(admission => !selectedAdmissions.includes(admission.id)));
                      setSelectedAdmissions([]);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredAdmissions.map((admission, index) => (
          <motion.div
            key={admission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-primary/20 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={selectedAdmissions.includes(admission.id)}
                    onCheckedChange={() => handleAdmissionSelect(admission.id)}
                    className="mt-1"
                  />
                  
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={admission.studentName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {admission.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{admission.studentName}</h3>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            Age: {admission.age}
                          </Badge>
                          <Badge className={`${getStatusColor(admission.status)}`}>
                            {admission.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Guardian:</span> {admission.guardianName}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {admission.email}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {admission.phone}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Course:</span> {admission.course}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Experience:</span> {admission.experience}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Applied: {admission.date}
                            </p>
                          </div>
                        </div>

                        {admission.notes && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Notes:</span> {admission.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {admission.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-200 text-green-700 hover:bg-green-50"
                              onClick={() => handleStatusChange(admission.id, 'approved')}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                              onClick={() => handleStatusChange(admission.id, 'waitlisted')}
                            >
                              <Users className="h-4 w-4 mr-1" />
                              Waitlist
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => handleStatusChange(admission.id, 'rejected')}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Certificate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDelete(admission.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAdmissions.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No applications found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== 'All' || courseFilter !== 'All'
              ? 'Try adjusting your search or filter criteria'
              : 'No applications have been submitted yet'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}
