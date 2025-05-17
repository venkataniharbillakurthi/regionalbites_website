import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const OWNER_CONTACT = '+91 8328657726';

const products = [
  {
    id: 1,
    name: 'Dry Fruit Putharekulu',
    description: 'Traditional Andhra sweet made with dry fruits and rice flakes',
    price: 250,
    image: '/images/dry-fruit-puth.jpg',
    details: 'A rich and delicious variation of Putharekulu made with premium dry fruits. Perfect for gifting and special occasions.',
    contactNumber: OWNER_CONTACT
  },
  {
    id: 2,
    name: 'Mango Jelly',
    description: 'Fresh mango jelly made with natural ingredients',
    price: 150,
    image: '/images/mango-jelly.jpg',
    details: 'A refreshing mango jelly made with fresh mango pulp and natural flavors. Ideal for summer.',
    contactNumber: OWNER_CONTACT
  },
  {
    id: 3,
    name: 'Palmyra Jelly',
    description: 'Natural Palmyra palm jelly',
    price: 180,
    image: '/images/palmyra-jelly.jpg',
    details: 'A traditional Andhra delicacy made from Palmyra palm sap. Perfect for health-conscious sweet lovers.',
    contactNumber: OWNER_CONTACT
  }
];

const StyledSection = styled(Box)({
  padding: '4rem 0',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  background: 'rgba(255, 255, 255, 0.95)',
  transition: 'all 0.3s ease-in-out',
});

const PageTitle = styled(Typography)({
  marginBottom: '2rem',
  color: '#1a237e',
  fontWeight: 'bold',
  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    margin: '15px 0',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  color: '#1a237e',
  fontWeight: 600,
  borderRadius: '30px',
  padding: '8px 24px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c3cfe2',
      borderRadius: '12px',
    },
    '&:hover fieldset': {
      borderColor: '#1a237e',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1a237e',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#1a237e',
    '&.Mui-focused': {
      color: '#1a237e',
    },
  },
});

const PriceTag = styled(Typography)({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  color: '#1a237e',
  padding: '8px 16px',
  borderRadius: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  fontWeight: 'bold',
  display: 'inline-block',
  marginBottom: '1rem',
});

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with form details
    const whatsappMessage = `New Inquiry from Regional Bites Website\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Product: ${product.name}\n` +
      `Message: ${formData.message}`;
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${product.contactNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
  };

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  const whatsappMessage = `Hi, I'm interested in ${product.name}. ${formData.message}`;
  const whatsappLink = `https://wa.me/${product.contactNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  if (!product) {
    return (
      <StyledSection>
        <Container maxWidth="lg">
          <Typography variant="h5" color="#1a237e">
            Product not found
          </Typography>
        </Container>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={0}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
                }}
              />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={0}>
              <PageTitle variant="h4">
                {product.name}
              </PageTitle>
              <PriceTag variant="h5">
                ₹{product.price}
              </PriceTag>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#1a237e',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 4
                }}
              >
                {product.details}
              </Typography>

              <Box mt={4}>
                <PageTitle variant="h5">
                  Contact Us
                </PageTitle>
                <form onSubmit={handleSubmit}>
                  <StyledTextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <StyledTextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <StyledTextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <StyledTextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Box mt={3} display="flex" gap={2}>
                    <StyledButton
                      type="submit"
                      startIcon={<WhatsAppIcon />}
                      fullWidth
                    >
                      Send Message
                    </StyledButton>
                    <StyledButton
                      component="a"
                      href={`tel:${product.contactNumber}`}
                      startIcon={<PhoneIcon />}
                      fullWidth
                    >
                      Call Us
                    </StyledButton>
                  </Box>
                </form>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default ProductDetails;

