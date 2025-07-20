// Security Test Script
// Run this to verify security measures are working

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testSecurity() {
  console.log('🔒 Testing Security Measures...\n');

  try {
    // Test 1: Check if security headers are present
    console.log('1. Testing Security Headers...');
    const response = await axios.get(`${BASE_URL}/`);
    
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options', 
      'x-xss-protection',
      'referrer-policy',
      'permissions-policy',
      'content-security-policy'
    ];

    const missingHeaders = securityHeaders.filter(header => 
      !response.headers[header]
    );

    if (missingHeaders.length === 0) {
      console.log('✅ All security headers present');
    } else {
      console.log('❌ Missing headers:', missingHeaders);
    }

    // Test 2: Check rate limiting
    console.log('\n2. Testing Rate Limiting...');
    try {
      const promises = Array(6).fill().map(() => 
        axios.post(`${BASE_URL}/api/auth/login`, {
          email: 'test@test.com',
          password: 'password'
        })
      );
      
      await Promise.all(promises);
      console.log('❌ Rate limiting not working (should have been blocked)');
    } catch (error) {
      if (error.response?.status === 429) {
        console.log('✅ Rate limiting working correctly');
      } else {
        console.log('⚠️ Rate limiting test inconclusive');
      }
    }

    // Test 3: Check CORS
    console.log('\n3. Testing CORS...');
    try {
      await axios.get(`${BASE_URL}/api/products`, {
        headers: {
          'Origin': 'http://malicious-site.com'
        }
      });
      console.log('❌ CORS not properly configured');
    } catch (error) {
      if (error.response?.status === 403 || error.code === 'ERR_NETWORK') {
        console.log('✅ CORS properly configured');
      } else {
        console.log('⚠️ CORS test inconclusive');
      }
    }

    console.log('\n🔒 Security Test Complete!');
    console.log('\n📋 Manual Testing Checklist:');
    console.log('- [ ] JWT tokens not visible in browser dev tools');
    console.log('- [ ] No sensitive data in console logs');
    console.log('- [ ] httpOnly cookies are set');
    console.log('- [ ] XSS protection working');
    console.log('- [ ] CSRF protection active');

  } catch (error) {
    console.error('❌ Security test failed:', error.message);
  }
}

// Run the test
testSecurity(); 