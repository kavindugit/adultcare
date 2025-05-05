
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ServiceCard = ({ service, index }) => {
  // Format price to 2 decimal places and add currency symbol
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(service.price);

  // Format duration for display
  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes === 60) {
      return `1 hour`;
    } else if (minutes % 60 === 0) {
      return `${minutes / 60} hours`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
  };

  // Service type badge color
  const getBadgeVariant = (type) => {
    switch (type) {
      case 'doctor-consultation':
        return 'default';
      case 'therapy-session':
        return 'secondary';
      case 'bed-reservation':
        return 'destructive';
      case 'daily-care':
        return 'outline';
      default:
        return 'default';
    }
  };

  // Service type display name
  const getServiceTypeLabel = (type) => {
    switch (type) {
      case 'doctor-consultation':
        return 'Medical Consultation';
      case 'therapy-session':
        return 'Therapy';
      case 'bed-reservation':
        return 'Accommodation';
      case 'daily-care':
        return 'Daily Care';
      default:
        return type;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={service.image.startsWith('http') ? service.image : '/placeholder.svg'}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              // If image fails to load, set a placeholder
              e.target.src = '/placeholder.svg';
            }}
          />
          <Badge 
            variant={getBadgeVariant(service.type)}
            className="absolute top-3 right-3"
          >
            {getServiceTypeLabel(service.type)}
          </Badge>
        </div>
        
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-2">{service.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {service.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatDuration(service.duration)}</span>
            </div>
            <div className="font-medium">{formattedPrice}</div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 py-4 border-t">
          <Button 
            asChild 
            variant="default" 
            className="w-full group"
          >
            <Link to={`/booking?serviceId=${service.id}`}>
              Book Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
