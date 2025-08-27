import React from 'react';
import {
  Wallet,
  Wifi,
  Sun,
  Moon,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeClasses } from '../types';
import LanguageSelector from './LanguageSelector';

const recentPayouts = [
  { name: "Priya Kapoor", location: "Mumbai, India", amount: "₹85,075 INR", method: "UPI (India)" },
  { name: "James Taylor", location: "Sydney, Australia", amount: "A$5,200 AUD", method: "Bank Transfer" },
  { name: "Anna Lindberg", location: "Stockholm, Sweden", amount: "kr29,500 SEK", method: "Bank Transfer" },
  { name: "Maria Garcia", location: "Madrid, Spain", amount: "€3,250 EUR", method: "SEPA" },
  { name: "Alex Robinson", location: "Toronto, Canada", amount: "C$7,870 CAD", method: "PayPal" },
  { name: "David Lee", location: "London, UK", amount: "£22,150 GBP", method: "Bank Transfer" },
  { name: "Nguyen Tran", location: "Ho Chi Minh City, Vietnam", amount: "₫30,000,000 VND", method: "Bank Transfer" },
  { name: "Olga Sobieski", location: "Warsaw, Poland", amount: "zł2,160 PLN", method: "BLIK" },
  { name: "Chloe Tremblay", location: "Montreal, Canada", amount: "C$1,870 CAD", method: "PayPal" },
  { name: "Chen Wang", location: "Singapore", amount: "S$13,350 SGD", method: "Bank Transfer" },
  { name: "Ahmed Khan", location: "Dubai, UAE", amount: "د.إ18,300 AED", method: "Bank Transfer" },
  { name: "Fatima Ali", location: "Casablanca, Morocco", amount: "د.م.13,800 MAD", method: "Bank Transfer" },
  { name: "Raj Patel", location: "Delhi, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Samuel Kim", location: "Seoul, South Korea", amount: "₩2,300,000 KRW", method: "Bank Transfer" },
  { name: "Sven Johansson", location: "Gothenburg, Sweden", amount: "kr14,750 SEK", method: "Swish" },
  { name: "Emily Smith", location: "New York, USA", amount: "$9,480 USD", method: "PayPal" },
  { name: "Luisa Gallo", location: "Rome, Italy", amount: "€7,000 EUR", method: "SEPA" },
  { name: "Chris van Dijk", location: "Amsterdam, Netherlands", amount: "€2,800 EUR", method: "iDEAL" },
  { name: "Jack Wilson", location: "Manchester, UK", amount: "£5,110 GBP", method: "Bank Transfer" },
  { name: "Elena Petrova", location: "Moscow, Russia", amount: "₽88,500 RUB", method: "Bank Transfer" },
  { name: "Santiago Perez", location: "Lima, Peru", amount: "S/3,500 PEN", method: "Bank Transfer" },
  { name: "Amira Saad", location: "Cairo, Egypt", amount: "£E12,900 EGP", method: "Bank Transfer" },
  { name: "Isabella Conti", location: "Milan, Italy", amount: "€3,900 EUR", method: "SEPA" },
  { name: "Niko Salo", location: "Helsinki, Finland", amount: "€1,750 EUR", method: "Bank Transfer" },
  { name: "Sara Lee", location: "San Francisco, USA", amount: "$6,220 USD", method: "ACH" },
  { name: "Oluwaseun Adeyemi", location: "Lagos, Nigeria", amount: "₦1,850,000 NGN", method: "Bank Transfer" },
  { name: "Jean-Pierre Martin", location: "Paris, France", amount: "€2,100 EUR", method: "SEPA" },
  { name: "Olivia Brown", location: "Auckland, New Zealand", amount: "NZ$8,500 NZD", method: "Bank Transfer" },
  { name: "Aisha Rahman", location: "Dhaka, Bangladesh", amount: "৳1,50,000 BDT", method: "Bank Transfer" },
  { name: "Samantha King", location: "Cape Town, South Africa", amount: "R18,750 ZAR", method: "Bank Transfer" },
  { name: "Anya Volkov", location: "Saint Petersburg, Russia", amount: "₽1,20,000 RUB", method: "Bank Transfer" },
  { name: "Mohammed Al Farsi", location: "Muscat, Oman", amount: "ر.ع.2,900 OMR", method: "Bank Transfer" },
  { name: "Lucas Silva", location: "São Paulo, Brazil", amount: "R$15,200 BRL", method: "Pix" },
  { name: "Khalid Mansour", location: "Riyadh, Saudi Arabia", amount: "﷼7,600 SAR", method: "SARIE" },
  { name: "Jin Soo Park", location: "Busan, South Korea", amount: "₩1,750,000 KRW", method: "Bank Transfer" },
  { name: "Irina Popescu", location: "Bucharest, Romania", amount: "lei 8,200 RON", method: "Bank Transfer" },
  { name: "Ahmed El Gohary", location: "Alexandria, Egypt", amount: "£E7,300 EGP", method: "Bank Transfer" },
  { name: "Karan Joshi", location: "Bangalore, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Jessica Wilson", location: "Vancouver, Canada", amount: "C$3,100 CAD", method: "PayPal" },
  { name: "Pierre Dubois", location: "Lyon, France", amount: "€3,350 EUR", method: "SEPA" },
  { name: "Zara Isik", location: "Istanbul, Turkey", amount: "₺9,100 TRY", method: "Bank Transfer" },
  { name: "Thomas Meyer", location: "Zurich, Switzerland", amount: "Fr.12,500 CHF", method: "Bank Transfer" },
  { name: "Bruno Costa", location: "Lisbon, Portugal", amount: "€5,750 EUR", method: "MB WAY" },
  { name: "Nina Romanov", location: "Moscow, Russia", amount: "₽45,000 RUB", method: "Bank Transfer" },
  { name: "Lisa Müller", location: "Berlin, Germany", amount: "€2,120 EUR", method: "SEPA" },
  { name: "Samuel Mensah", location: "Accra, Ghana", amount: "₵12,000 GHS", method: "Bank Transfer" },
  { name: "Siti Aisyah", location: "Kuala Lumpur, Malaysia", amount: "RM8,700 MYR", method: "Bank Transfer" },
  { name: "Enrique Morales", location: "Mexico City, Mexico", amount: "$22,000 MXN", method: "SPEI" },
  { name: "Carmen Diaz", location: "Barcelona, Spain", amount: "€3,700 EUR", method: "SEPA" },
  { name: "Kofi Boateng", location: "Kigali, Rwanda", amount: "FRw1,800,000 RWF", method: "Bank Transfer" },
  { name: "Riya Verma", location: "Ahmedabad, India", amount: "₹46,480 INR", method: "UPI (India)" },
  { name: "Antonio Russo", location: "Naples, Italy", amount: "€1,900 EUR", method: "SEPA" },
  { name: "Peter Jensen", location: "Copenhagen, Denmark", amount: "kr14,100 DKK", method: "MobilePay" },
  { name: "Hiroshi Nakamura", location: "Tokyo, Japan", amount: "¥980,000 JPY", method: "Bank Transfer" },
  { name: "Sofia Martin", location: "Buenos Aires, Argentina", amount: "$230,000 ARS", method: "Bank Transfer" },
  { name: "Emily Johnson", location: "Dublin, Ireland", amount: "€5,900 EUR", method: "SEPA" },
  { name: "Fiona O'Brien", location: "Belfast, UK", amount: "£6,800 GBP", method: "Bank Transfer" },
  { name: "Aarav Sinha", location: "Lucknow, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Sara Svensson", location: "Uppsala, Sweden", amount: "kr7,300 SEK", method: "Swish" },
  { name: "Noah Smith", location: "Los Angeles, USA", amount: "$19,800 USD", method: "ACH" },
  { name: "Amina Diallo", location: "Bamako, Mali", amount: "CFA 1,200,000 XOF", method: "Bank Transfer" },
  { name: "Meera Desai", location: "Pune, India", amount: "₹68,060 INR", method: "UPI (India)" },
  { name: "Lucas Oliveira", location: "Rio de Janeiro, Brazil", amount: "R$9,500 BRL", method: "Pix" },
  { name: "Catherine Lee", location: "Hong Kong", amount: "HK$41,000 HKD", method: "FPS" },
  { name: "Gabriel Santos", location: "Brasilia, Brazil", amount: "R$18,000 BRL", method: "Pix" },
  { name: "Mikhail Ivanov", location: "Minsk, Belarus", amount: "Br 5,000 BYN", method: "Bank Transfer" },
  { name: "Yousef Hassan", location: "Doha, Qatar", amount: "ر.ق14,400 QAR", method: "Bank Transfer" },
  { name: "Nikhil Reddy", location: "Chennai, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Kim Min-Jae", location: "Seoul, South Korea", amount: "₩950,000 KRW", method: "Bank Transfer" },
  { name: "Jasmine Turner", location: "Toronto, Canada", amount: "C$4,500 CAD", method: "PayPal" },
  { name: "Jean Dupont", location: "Brussels, Belgium", amount: "€3,400 EUR", method: "SEPA" },
  { name: "Marta Nowak", location: "Gdansk, Poland", amount: "zł5,000 PLN", method: "BLIK" },
  { name: "Vikram Sharma", location: "Hyderabad, India", amount: "₹99,800 INR", method: "UPI (India)" },
  { name: "Julia Fischer", location: "Vienna, Austria", amount: "€8,150 EUR", method: "SEPA" },
  { name: "Fatou N'Diaye", location: "Dakar, Senegal", amount: "CFA 850,000 XOF", method: "Bank Transfer" },
  { name: "William Baker", location: "Auckland, New Zealand", amount: "NZ$3,300 NZD", method: "Bank Transfer" },
  { name: "Juan Carlos", location: "Lima, Peru", amount: "S/8,600 PEN", method: "Bank Transfer" },
  { name: "Samira Benali", location: "Rabat, Morocco", amount: "د.م.21,000 MAD", method: "Bank Transfer" },
  { name: "Victor Huang", location: "Taipei, Taiwan", amount: "NT$28,000 TWD", method: "Bank Transfer" },
  { name: "Khaled Nasser", location: "Kuwait City, Kuwait", amount: "د.ك1,450 KWD", method: "Bank Transfer" },
  { name: "Tomáš Novák", location: "Prague, Czechia", amount: "Kč24,000 CZK", method: "Bank Transfer" },
  { name: "Isabella Costa", location: "Sao Paulo, Brazil", amount: "R$13,300 BRL", method: "Pix" },
  { name: "Kevin Müller", location: "Bern, Switzerland", amount: "Fr.8,400 CHF", method: "Bank Transfer" },
  { name: "Leah Goldstein", location: "Tel Aviv, Israel", amount: "₪18,200 ILS", method: "Bank Transfer" },
  { name: "Thabo Mokoena", location: "Johannesburg, South Africa", amount: "R12,500 ZAR", method: "Bank Transfer" },
  { name: "Simon Lee", location: "Singapore", amount: "S$9,700 SGD", method: "Bank Transfer" },
  { name: "Tanya Roy", location: "Jaipur, India", amount: "₹85,000 INR", method: "UPI (India)" },
  { name: "Felipe Souza", location: "Salvador, Brazil", amount: "R$4,600 BRL", method: "Pix" },
  { name: "Elizabeth Jones", location: "Boston, USA", amount: "$7,900 USD", method: "ACH" },
  { name: "Rohit Gupta", location: "Indore, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Alicia Gomez", location: "Mexico City, Mexico", amount: "$15,400 MXN", method: "SPEI" },
  { name: "Anders Berg", location: "Stockholm, Sweden", amount: "kr10,900 SEK", method: "Bank Transfer" },
  { name: "Omar Farouk", location: "Cairo, Egypt", amount: "£E11,200 EGP", method: "Bank Transfer" },
  { name: "Luciana Alvarez", location: "Buenos Aires, Argentina", amount: "$325,000 ARS", method: "Bank Transfer" },
  { name: "Muhammad Yusuf", location: "Jakarta, Indonesia", amount: "Rp24,500,000 IDR", method: "Bank Transfer" },
  { name: "Kaito Suzuki", location: "Osaka, Japan", amount: "¥750,000 JPY", method: "Bank Transfer" },
  { name: "Nora Schmidt", location: "Munich, Germany", amount: "€2,900 EUR", method: "SEPA" },
  { name: "Farida Hassan", location: "Abu Dhabi, UAE", amount: "د.إ11,500 AED", method: "Bank Transfer" },
  { name: "Mehmet Demir", location: "Istanbul, Turkey", amount: "₺13,200 TRY", method: "Bank Transfer" },
  { name: "Linda Berg", location: "Oslo, Norway", amount: "kr18,300 NOK", method: "Bank Transfer" },
  { name: "Tinashe Chirwa", location: "Harare, Zimbabwe", amount: "$3,200 USD", method: "Bank Transfer" },
  { name: "Mia Nguyen", location: "Hanoi, Vietnam", amount: "₫22,800,000 VND", method: "Bank Transfer" },
  { name: "Felix Weber", location: "Zurich, Switzerland", amount: "Fr.15,700 CHF", method: "Bank Transfer" },
  { name: "Manuel Sousa", location: "Porto, Portugal", amount: "€2,400 EUR", method: "MB WAY" },
  { name: "Sneha Iyer", location: "Nagpur, India", amount: "₹77,190 INR", method: "UPI (India)" },
  { name: "Stephanie Brown", location: "Dallas, USA", amount: "$8,100 USD", method: "ACH" },
  { name: "Henrik Nielsen", location: "Copenhagen, Denmark", amount: "kr12,400 DKK", method: "MobilePay" },
  { name: "Fatima Zahra", location: "Marrakech, Morocco", amount: "د.م.5,800 MAD", method: "Bank Transfer" },
  { name: "Sebastian Maier", location: "Vienna, Austria", amount: "€4,500 EUR", method: "SEPA" },
  { name: "Daniel Okafor", location: "Abuja, Nigeria", amount: "₦970,000 NGN", method: "Bank Transfer" },
  { name: "Aarav Menon", location: "Kolkata, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Yara Haddad", location: "Beirut, Lebanon", amount: "ل.ل.3,800,000 LBP", method: "Bank Transfer" },
  { name: "Alexei Smirnov", location: "Novosibirsk, Russia", amount: "₽56,200 RUB", method: "Bank Transfer" },
  { name: "Laura Rossi", location: "Florence, Italy", amount: "€2,500 EUR", method: "SEPA" },
  { name: "Emily O'Connor", location: "Galway, Ireland", amount: "€3,400 EUR", method: "SEPA" },
  { name: "Gustavo Lima", location: "Brasilia, Brazil", amount: "R$6,800 BRL", method: "Pix" },
  { name: "Oliver Thompson", location: "London, UK", amount: "£13,000 GBP", method: "Bank Transfer" },
  { name: "Rajesh Kumar", location: "Jaipur, India", amount: "₹93,300 INR", method: "UPI (India)" },
  { name: "Jana Novak", location: "Brno, Czechia", amount: "Kč10,800 CZK", method: "Bank Transfer" },
  { name: "Rachel Evans", location: "Wellington, New Zealand", amount: "NZ$5,800 NZD", method: "Bank Transfer" },
  { name: "Mateo Gutierrez", location: "Medellin, Colombia", amount: "$6,900,000 COP", method: "PSE" },
  { name: "Patrick Dubois", location: "Nice, France", amount: "€2,200 EUR", method: "SEPA" },
  { name: "Fiona McCarthy", location: "Cork, Ireland", amount: "€4,300 EUR", method: "SEPA" },
  { name: "Omar Hamdi", location: "Tunis, Tunisia", amount: "د.ت.4,900 TND", method: "Bank Transfer" },
  { name: "Felicity Turner", location: "Birmingham, UK", amount: "£9,800 GBP", method: "Bank Transfer" },
  { name: "Usman Bello", location: "Kano, Nigeria", amount: "₦1,100,000 NGN", method: "Bank Transfer" },
  { name: "Koen Visser", location: "Amsterdam, Netherlands", amount: "€7,200 EUR", method: "iDEAL" },
  { name: "Johan Andersson", location: "Malmo, Sweden", amount: "kr10,600 SEK", method: "Swish" },
  { name: "Gong Li", location: "Shanghai, China", amount: "¥35,000 CNY", method: "Bank Transfer" },
  { name: "David Miller", location: "Los Angeles, USA", amount: "$12,000 USD", method: "ACH" },
  { name: "Mahmoud Khaled", location: "Alexandria, Egypt", amount: "£E6,700 EGP", method: "Bank Transfer" },
  { name: "Wei Zhang", location: "Beijing, China", amount: "¥28,600 CNY", method: "Bank Transfer" },
  { name: "Mohammed Siddiq", location: "Karachi, Pakistan", amount: "₨2,10,000 PKR", method: "Bank Transfer" },
  { name: "Karim Hassan", location: "Casablanca, Morocco", amount: "د.م.8,400 MAD", method: "Bank Transfer" },
  { name: "Ivan Markovic", location: "Zagreb, Croatia", amount: "kn6,700 HRK", method: "Bank Transfer" },
  { name: "Victor Ncube", location: "Bulawayo, Zimbabwe", amount: "$2,100 USD", method: "Bank Transfer" },
  { name: "Evelyn Green", location: "Dublin, Ireland", amount: "€3,250 EUR", method: "SEPA" },
  { name: "Arwa Al Saud", location: "Jeddah, Saudi Arabia", amount: "﷼6,800 SAR", method: "SARIE" },
  { name: "Niklas Moller", location: "Gothenburg, Sweden", amount: "kr8,900 SEK", method: "Bank Transfer" },
  { name: "Olivia Thompson", location: "Auckland, New Zealand", amount: "NZ$4,900 NZD", method: "Bank Transfer" },
  { name: "Wang Wei", location: "Shenzhen, China", amount: "¥19,800 CNY", method: "Bank Transfer" },
  { name: "Ritika Shah", location: "Vadodara, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Matheus Silva", location: "Porto Alegre, Brazil", amount: "R$8,300 BRL", method: "Pix" },
  { name: "Hanna Larsson", location: "Stockholm, Sweden", amount: "kr11,400 SEK", method: "Swish" },
  { name: "Emmanuel Mensah", location: "Accra, Ghana", amount: "₵18,900 GHS", method: "Bank Transfer" },
  { name: "Reema Patel", location: "Ahmedabad, India", amount: "₹84,400 INR", method: "UPI (India)" },
  { name: "Emma Nilsson", location: "Uppsala, Sweden", amount: "kr7,900 SEK", method: "Bank Transfer" },
  { name: "Karolina Zielinska", location: "Warsaw, Poland", amount: "zł4,100 PLN", method: "BLIK" },
  { name: "Samuel Kim", location: "Busan, South Korea", amount: "₩1,800,000 KRW", method: "Bank Transfer" },
  { name: "Mark Evans", location: "Boston, USA", amount: "$11,600 USD", method: "ACH" },
  { name: "Ekaterina Ivanova", location: "Saint Petersburg, Russia", amount: "₽41,000 RUB", method: "Bank Transfer" },
  { name: "Ayaan Qureshi", location: "Hyderabad, India", amount: "₹71,900 INR", method: "UPI (India)" },
  { name: "Diana Kolesnikova", location: "Moscow, Russia", amount: "₽67,500 RUB", method: "Bank Transfer" },
  { name: "Joshua Brown", location: "Chicago, USA", amount: "$5,500 USD", method: "ACH" },
  { name: "Nikolai Popov", location: "Kazan, Russia", amount: "₽49,000 RUB", method: "Bank Transfer" },
  { name: "Tracy Smith", location: "Vancouver, Canada", amount: "C$6,900 CAD", method: "PayPal" },
  { name: "Ana Pereira", location: "Lisbon, Portugal", amount: "€1,800 EUR", method: "MB WAY" },
  { name: "Lars Jensen", location: "Copenhagen, Denmark", amount: "kr13,200 DKK", method: "MobilePay" },
  { name: "Rohit Sethi", location: "Pune, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Marta Nowak", location: "Gdansk, Poland", amount: "zł6,800 PLN", method: "BLIK" },
  { name: "Juan Perez", location: "Lima, Peru", amount: "S/12,100 PEN", method: "Bank Transfer" },
  { name: "Karim Ali", location: "Cairo, Egypt", amount: "£E10,100 EGP", method: "Bank Transfer" },
  { name: "Clara Müller", location: "Hamburg, Germany", amount: "€2,500 EUR", method: "SEPA" },
  { name: "Sneha Mehra", location: "Delhi, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Miguel Santos", location: "Sao Paulo, Brazil", amount: "R$12,800 BRL", method: "Pix" },
  { name: "Daniel Almeida", location: "Lisbon, Portugal", amount: "€6,100 EUR", method: "MB WAY" },
  { name: "Aline Costa", location: "Rio de Janeiro, Brazil", amount: "R$5,600 BRL", method: "Pix" },
  { name: "Julia Kowalska", location: "Krakow, Poland", amount: "zł2,900 PLN", method: "BLIK" },
  { name: "Lina Zhang", location: "Beijing, China", amount: "¥22,500 CNY", method: "Bank Transfer" },
  { name: "Rajiv Narayan", location: "Chennai, India", amount: "₹81,700 INR", method: "UPI (India)" },
  { name: "Joao Pereira", location: "Lisbon, Portugal", amount: "€9,900 EUR", method: "MB WAY" },
  { name: "Sonia Martinez", location: "Barcelona, Spain", amount: "€2,400 EUR", method: "SEPA" },
  { name: "Daniel Williams", location: "London, UK", amount: "£17,900 GBP", method: "Bank Transfer" },
  { name: "Mohammed Said", location: "Amman, Jordan", amount: "د.ا.6,000 JOD", method: "Bank Transfer" },
  { name: "Linda Olsen", location: "Oslo, Norway", amount: "kr19,600 NOK", method: "Bank Transfer" },
  { name: "Victor Chen", location: "Hong Kong", amount: "HK$58,300 HKD", method: "FPS" },
  { name: "Nandita Singh", location: "Lucknow, India", amount: "₹92,800 INR", method: "UPI (India)" },
  { name: "Paul Weber", location: "Vienna, Austria", amount: "€7,600 EUR", method: "SEPA" },
  { name: "Eva Svensson", location: "Malmo, Sweden", amount: "kr6,300 SEK", method: "Swish" },
  { name: "Joseph Mensah", location: "Accra, Ghana", amount: "₵9,700 GHS", method: "Bank Transfer" },
  { name: "Dimitris Papadopoulos", location: "Athens, Greece", amount: "€3,000 EUR", method: "Bank Transfer" },
  { name: "Manuel Ruiz", location: "Madrid, Spain", amount: "€8,800 EUR", method: "SEPA" },
  { name: "Patricia Almeida", location: "Porto, Portugal", amount: "€4,900 EUR", method: "MB WAY" },
  { name: "Aishwarya Deshmukh", location: "Mumbai, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Omar El-Farouk", location: "Cairo, Egypt", amount: "£E8,600 EGP", method: "Bank Transfer" },
  { name: "Amit Rathi", location: "Delhi, India", amount: "₹92,300 INR", method: "UPI (India)" },
  { name: "Sneha Sharma", location: "Pune, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Rohit Gupta", location: "Mumbai, India", amount: "₹99,000 INR", method: "UPI (India)" },
  { name: "Priya Verma", location: "Lucknow, India", amount: "₹85,750 INR", method: "UPI (India)" },
  { name: "Meera Iyer", location: "Chennai, India", amount: "₹54,700 INR", method: "UPI (India)" },
  { name: "Manish Patel", location: "Ahmedabad, India", amount: "₹89,100 INR", method: "UPI (India)" },
  { name: "Pooja Nair", location: "Thiruvananthapuram, India", amount: "₹78,250 INR", method: "UPI (India)" },
  { name: "Ankit Singh", location: "Bangalore, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Kavita Chawla", location: "Kolkata, India", amount: "₹70,500 INR", method: "UPI (India)" },
  { name: "Arvind Mehta", location: "Jaipur, India", amount: "₹58,000 INR", method: "UPI (India)" },
  { name: "Deepika Sethi", location: "Patna, India", amount: "₹33,150 INR", method: "UPI (India)" },
  { name: "Ramesh Kumar", location: "Kanpur, India", amount: "₹22,950 INR", method: "UPI (India)" },
  { name: "Jaya Rao", location: "Hyderabad, India", amount: "₹84,600 INR", method: "UPI (India)" },
  { name: "Aarav Pillai", location: "Chandigarh, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Nikita Jain", location: "Indore, India", amount: "₹75,700 INR", method: "UPI (India)" },
  { name: "Aakash Shah", location: "Vadodara, India", amount: "₹88,500 INR", method: "UPI (India)" },
  { name: "Bhavna Yadav", location: "Ranchi, India", amount: "₹63,900 INR", method: "UPI (India)" },
  { name: "Rohini Joshi", location: "Nagpur, India", amount: "₹39,000 INR", method: "UPI (India)" },
  { name: "Rahul Desai", location: "Delhi, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Vikram Aggarwal", location: "Mumbai, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Riya Kulkarni", location: "Pune, India", amount: "₹45,120 INR", method: "UPI (India)" },
  { name: "Rajeev Saini", location: "Chennai, India", amount: "₹69,300 INR", method: "UPI (India)" },
  { name: "Divya Menon", location: "Bangalore, India", amount: "₹82,000 INR", method: "UPI (India)" },
  { name: "Aishwarya Rao", location: "Lucknow, India", amount: "₹91,000 INR", method: "UPI (India)" },
  { name: "Akash Tripathi", location: "Indore, India", amount: "₹97,500 INR", method: "UPI (India)" },
  { name: "Sanjay Singh", location: "Delhi, India", amount: "₹43,700 INR", method: "UPI (India)" },
  { name: "Tanvi Bansal", location: "Kanpur, India", amount: "₹80,200 INR", method: "UPI (India)" },
  { name: "Ashish Sharma", location: "Ahmedabad, India", amount: "₹51,600 INR", method: "UPI (India)" },
  { name: "Preeti Malhotra", location: "Mumbai, India", amount: "₹60,000 INR", method: "UPI (India)" },
  { name: "Kiran Das", location: "Hyderabad, India", amount: "₹78,900 INR", method: "UPI (India)" },
  { name: "Sarah Adams", location: "London, UK", amount: "£5,400 GBP", method: "Bank Transfer" },
  { name: "Olga Ivanova", location: "Moscow, Russia", amount: "₽53,800 RUB", method: "Bank Transfer" },
  { name: "Lars Eriksen", location: "Stockholm, Sweden", amount: "kr12,700 SEK", method: "Swish" },
  { name: "Nora Schmidt", location: "Munich, Germany", amount: "€6,900 EUR", method: "SEPA" },
  { name: "Zhihao Li", location: "Shanghai, China", amount: "¥21,000 CNY", method: "Bank Transfer" },
  { name: "Fatou Ndiaye", location: "Dakar, Senegal", amount: "CFA 1,200,000 XOF", method: "Bank Transfer" },
  { name: "Luisa Moreira", location: "Lisbon, Portugal", amount: "€3,300 EUR", method: "MB WAY" },
  { name: "Thabo Ndlovu", location: "Johannesburg, South Africa", amount: "R18,900 ZAR", method: "Bank Transfer" },
  { name: "Santiago Torres", location: "Bogota, Colombia", amount: "$7,800,000 COP", method: "PSE" },
  { name: "Yuki Sato", location: "Osaka, Japan", amount: "¥340,000 JPY", method: "Bank Transfer" },
  { name: "Eva Karlsson", location: "Uppsala, Sweden", amount: "kr4,800 SEK", method: "Swish" },
  { name: "Martin Weber", location: "Zurich, Switzerland", amount: "Fr.19,000 CHF", method: "Bank Transfer" },
  { name: "Francisco Ramos", location: "Madrid, Spain", amount: "€9,600 EUR", method: "SEPA" },
  { name: "Svetlana Kuznetsova", location: "Saint Petersburg, Russia", amount: "₽34,900 RUB", method: "Bank Transfer" },
  { name: "Karim Morsi", location: "Cairo, Egypt", amount: "£E15,200 EGP", method: "Bank Transfer" },
  { name: "Isabel Fernandes", location: "Porto, Portugal", amount: "€4,700 EUR", method: "MB WAY" },
  { name: "Sebastian Bauer", location: "Berlin, Germany", amount: "€5,300 EUR", method: "SEPA" },
  { name: "Siti Nurhaliza", location: "Kuala Lumpur, Malaysia", amount: "RM9,800 MYR", method: "Bank Transfer" },
  { name: "John Smith", location: "New York, USA", amount: "$8,750 USD", method: "PayPal" },
  { name: "Aarav Singh", location: "Delhi, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Nisha Reddy", location: "Hyderabad, India", amount: "₹55,600 INR", method: "UPI (India)" },
  { name: "Karthik Srinivasan", location: "Bangalore, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Bhavesh Shah", location: "Ahmedabad, India", amount: "₹79,900 INR", method: "UPI (India)" },
  { name: "Vandana Rao", location: "Pune, India", amount: "₹43,850 INR", method: "UPI (India)" },
  { name: "Mahesh Sharma", location: "Chandigarh, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Neha Gupta", location: "Mumbai, India", amount: "₹88,200 INR", method: "UPI (India)" },
  { name: "Shreya Joshi", location: "Lucknow, India", amount: "₹73,400 INR", method: "UPI (India)" },
  { name: "Rahul Bhatia", location: "Delhi, India", amount: "₹97,400 INR", method: "UPI (India)" },
  { name: "Anjali Nair", location: "Bangalore, India", amount: "₹69,700 INR", method: "UPI (India)" },
  { name: "Arjun Mehta", location: "Kolkata, India", amount: "₹49,500 INR", method: "UPI (India)" },
  { name: "Parul Yadav", location: "Kanpur, India", amount: "₹84,300 INR", method: "UPI (India)" },
  { name: "Sagar Jain", location: "Mumbai, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Vivek Deshmukh", location: "Pune, India", amount: "₹66,800 INR", method: "UPI (India)" },
  { name: "Ritika Sinha", location: "Jaipur, India", amount: "₹78,400 INR", method: "UPI (India)" },
  { name: "Ajay Rao", location: "Chennai, India", amount: "₹41,700 INR", method: "UPI (India)" },
  { name: "Nisha Chauhan", location: "Delhi, India", amount: "₹87,100 INR", method: "UPI (India)" },
  { name: "Divya Sharma", location: "Bangalore, India", amount: "₹72,600 INR", method: "UPI (India)" },
  { name: "Sandeep Kumar", location: "Lucknow, India", amount: "₹53,200 INR", method: "UPI (India)" },
  { name: "Sonal Kaur", location: "Chandigarh, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Sumit Patel", location: "Ahmedabad, India", amount: "₹81,300 INR", method: "UPI (India)" },
  { name: "Raj Malhotra", location: "Delhi, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Aparna Sen", location: "Kolkata, India", amount: "₹99,900 INR", method: "UPI (India)" },
  { name: "Zara Sheikh", location: "Pune, India", amount: "₹76,700 INR", method: "UPI (India)" },
  { name: "Isha Sharma", location: "Mumbai, India", amount: "₹68,500 INR", method: "UPI (India)" },
  { name: "Kabir Kumar", location: "Hyderabad, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Aarti Patel", location: "Bangalore, India", amount: "₹89,900 INR", method: "UPI (India)" },
  { name: "Aditya Chauhan", location: "Delhi, India", amount: "₹94,100 INR", method: "UPI (India)" },
  { name: "Akhil Singh", location: "Chennai, India", amount: "₹55,000 INR", method: "UPI (India)" },
  { name: "Leena Verma", location: "Lucknow, India", amount: "₹82,100 INR", method: "UPI (India)" },
  { name: "Rashmi Nair", location: "Pune, India", amount: "₹72,500 INR", method: "UPI (India)" },
  { name: "Ritesh Gupta", location: "Kanpur, India", amount: "₹91,400 INR", method: "UPI (India)" },
  { name: "Tarun Ghosh", location: "Kolkata, India", amount: "₹88,800 INR", method: "UPI (India)" },
  { name: "Sanjana Kapoor", location: "Delhi, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Mehul Bansal", location: "Chandigarh, India", amount: "₹84,800 INR", method: "UPI (India)" },
  { name: "Snehal Desai", location: "Ahmedabad, India", amount: "₹93,900 INR", method: "UPI (India)" },
  { name: "Ajit Singh", location: "Jaipur, India", amount: "₹51,700 INR", method: "UPI (India)" },
  { name: "Ayaan Shah", location: "Delhi, India", amount: "₹99,500 INR", method: "UPI (India)" },
  { name: "Suhana Gupta", location: "Lucknow, India", amount: "₹1,00,000 INR", method: "UPI (India)" },
  { name: "Sara Müller", location: "Berlin, Germany", amount: "€4,200 EUR", method: "SEPA" },
  { name: "Emilia Rossi", location: "Rome, Italy", amount: "€2,300 EUR", method: "SEPA" },
  { name: "Alice Dubois", location: "Paris, France", amount: "€3,700 EUR", method: "SEPA" },
  { name: "Mariana Santos", location: "Rio de Janeiro, Brazil", amount: "R$4,800 BRL", method: "Pix" },
  { name: "Lin Wei", location: "Hong Kong", amount: "HK$32,100 HKD", method: "FPS" },
  { name: "Fatima Zahra", location: "Casablanca, Morocco", amount: "د.م.11,200 MAD", method: "Bank Transfer" },
  { name: "Omar Rahman", location: "Cairo, Egypt", amount: "£E9,300 EGP", method: "Bank Transfer" },
  { name: "Chen Wei", location: "Shanghai, China", amount: "¥28,300 CNY", method: "Bank Transfer" },
  { name: "Li Ming", location: "Beijing, China", amount: "¥41,900 CNY", method: "Bank Transfer" },
  { name: "Zhang Hui", location: "Shenzhen, China", amount: "¥25,600 CNY", method: "Bank Transfer" },
  { name: "Wang Fang", location: "Guangzhou, China", amount: "¥39,000 CNY", method: "Bank Transfer" },
  { name: "Zhou Li", location: "Chengdu, China", amount: "¥19,500 CNY", method: "Bank Transfer" },
  { name: "Tang Lin", location: "Wuhan, China", amount: "¥31,200 CNY", method: "Bank Transfer" },
  { name: "Sun Fei", location: "Hong Kong", amount: "HK$47,800 HKD", method: "FPS" },
  { name: "Guo Yan", location: "Macau, China", amount: "MOP$17,200 MOP", method: "Bank Transfer" },
  { name: "Liu Ying", location: "Nanjing, China", amount: "¥22,100 CNY", method: "Bank Transfer" },
  { name: "Qian Qi", location: "Hong Kong", amount: "HK$13,900 HKD", method: "FPS" },
  { name: "John Turner", location: "New York, USA", amount: "$9,650 USD", method: "ACH" },
  { name: "Emily Clark", location: "Toronto, Canada", amount: "C$7,800 CAD", method: "Bank Transfer" },
  { name: "Michael Brown", location: "Dallas, USA", amount: "$13,200 USD", method: "PayPal" },
  { name: "Sarah White", location: "Montreal, Canada", amount: "C$5,600 CAD", method: "PayPal" },
  { name: "Daniel Miller", location: "San Francisco, USA", amount: "$22,000 USD", method: "Bank Transfer" },
  { name: "Linda Scott", location: "Vancouver, Canada", amount: "C$11,900 CAD", method: "PayPal" },
  { name: "Brian Harris", location: "Houston, USA", amount: "$7,800 USD", method: "Bank Transfer" },
  { name: "Jessica Evans", location: "Calgary, Canada", amount: "C$3,250 CAD", method: "Bank Transfer" },
  { name: "Kevin Carter", location: "Los Angeles, USA", amount: "$14,800 USD", method: "ACH" },
  { name: "Olivia Hall", location: "Ottawa, Canada", amount: "C$8,400 CAD", method: "PayPal" },
  { name: "David Lee", location: "Boston, USA", amount: "$10,300 USD", method: "Bank Transfer" },
  { name: "Rebecca King", location: "Edmonton, Canada", amount: "C$2,950 CAD", method: "Bank Transfer" },
  { name: "Steven Wright", location: "Chicago, USA", amount: "$6,100 USD", method: "PayPal" },
  { name: "Anna Young", location: "Quebec City, Canada", amount: "C$4,850 CAD", method: "Bank Transfer" },
  { name: "Paul Walker", location: "Miami, USA", amount: "$5,400 USD", method: "ACH" },
  { name: "Natalie Adams", location: "Hamilton, Canada", amount: "C$1,700 CAD", method: "PayPal" },
  { name: "Christopher Moore", location: "Philadelphia, USA", amount: "$16,800 USD", method: "Bank Transfer" },
  { name: "Isabella Green", location: "Winnipeg, Canada", amount: "C$6,700 CAD", method: "Bank Transfer" },
  { name: "Mark Thompson", location: "Seattle, USA", amount: "$8,900 USD", method: "PayPal" },
  { name: "Lauren Martin", location: "Halifax, Canada", amount: "C$3,800 CAD", method: "Bank Transfer" },
  { name: "Richard Perez", location: "Las Vegas, USA", amount: "$11,200 USD", method: "ACH" },
  { name: "Victoria Robinson", location: "London, Canada", amount: "C$2,950 CAD", method: "PayPal" },
  { name: "Charles White", location: "Denver, USA", amount: "$7,000 USD", method: "Bank Transfer" },
  { name: "Amy Lewis", location: "Victoria, Canada", amount: "C$6,200 CAD", method: "PayPal" },
  { name: "Suresh Kumar", location: "Delhi, India", amount: "₹45,000 INR", method: "IMPS (India)" },
  { name: "Priya Joshi", location: "Pune, India", amount: "₹88,700 INR", method: "IMPS (India)" },
  { name: "Amit Sharma", location: "Bangalore, India", amount: "₹56,300 INR", method: "IMPS (India)" },
  { name: "Vikas Mehta", location: "Mumbai, India", amount: "₹81,500 INR", method: "IMPS (India)" },
  { name: "Meena Nair", location: "Chennai, India", amount: "₹27,900 INR", method: "IMPS (India)" },
  { name: "Rohit Patel", location: "Ahmedabad, India", amount: "₹92,800 INR", method: "IMPS (India)" },
  { name: "Anjali Sinha", location: "Lucknow, India", amount: "₹38,500 INR", method: "IMPS (India)" },
  
  { "name": "Aarav Sharma", location: "Delhi, India", amount: "₹45,200 INR", method: "UPI" },
  { "name": "Priya Patel", location: "Mumbai, India", amount: "₹78,500 INR", method: "IMPS" },
  { "name": "Vikram Rao", location: "Bangalore, India", amount: "₹92,000 INR", method: "Bank Transfer" },
  { "name": "Neha Gupta", location: "Chennai, India", amount: "₹63,700 INR", method: "UPI" },
  { "name": "Rahul Desai", location: "Kolkata, India", amount: "₹88,400 INR", method: "IMPS" },
  { "name": "Anita Singh", location: "Hyderabad, India", amount: "₹71,900 INR", method: "UPI" },
  { "name": "Rohit Kumar", location: "Ahmedabad, India", amount: "₹55,300 INR", method: "Bank Transfer" },
  { "name": "Meera Nair", location: "Pune, India", amount: "₹82,600 INR", method: "UPI" },
  { "name": "Sanjay Joshi", location: "Jaipur, India", amount: "₹39,800 INR", method: "IMPS" },
  { "name": "Divya Shah", location: "Lucknow, India", amount: "₹94,100 INR", method: "UPI" },
  { "name": "Arjun Mehta", location: "Chandigarh, India", amount: "₹67,500 INR", method: "Bank Transfer" },
  { "name": "Pooja Yadav", location: "Kanpur, India", amount: "₹76,200 INR", method: "UPI" },
  { "name": "Kiran Iyer", location: "Nagpur, India", amount: "₹88,900 INR", method: "IMPS" },
  { "name": "Amit Chauhan", location: "Delhi, India", amount: "₹52,400 INR", method: "UPI" },
  { "name": "Shreya Reddy", location: "Mumbai, India", amount: "₹95,700 INR", method: "Bank Transfer" },
  { "name": "Vikas Jain", location: "Bangalore, India", amount: "₹44,300 INR", method: "UPI" },
  { "name": "Sneha Pillai", location: "Chennai, India", amount: "₹79,600 INR", method: "IMPS" },
  { "name": "Rajesh Malhotra", location: "Kolkata, India", amount: "₹66,800 INR", method: "UPI" },
  { "name": "Nisha Bansal", location: "Hyderabad, India", amount: "₹91,200 INR", method: "Bank Transfer" },
  { "name": "Aarti Sen", location: "Ahmedabad, India", amount: "₹37,500 INR", method: "UPI" },
  { "name": "Sagar Kulkarni", location: "Pune, India", amount: "₹83,400 INR", method: "IMPS" },
  { "name": "Tanvi Sharma", location: "Jaipur, India", amount: "₹70,900 INR", method: "UPI" },
  { "name": "Aditya Gupta", location: "Lucknow, India", amount: "₹96,300 INR", method: "Bank Transfer" },
  { "name": "Riya Kapoor", location: "Chandigarh, India", amount: "₹49,700 INR", method: "UPI" },
  { "name": "Manish Patel", location: "Kanpur, India", amount: "₹87,100 INR", method: "IMPS" },
  { "name": "Kavita Das", location: "Nagpur, India", amount: "₹64,500 INR", method: "UPI" },
  { "name": "Akash Sinha", location: "Delhi, India", amount: "₹98,200 INR", method: "Bank Transfer" },
  { "name": "Sonal Kaur", location: "Mumbai, India", amount: "₹42,600 INR", method: "UPI" },
  { "name": "Rohini Thakur", location: "Bangalore, India", amount: "₹75,800 INR", method: "IMPS" },
  { "name": "Suresh Menon", location: "Chennai, India", amount: "₹89,400 INR", method: "UPI" },
  { "name": "James Wilson", location: "New York, United States", amount: "$7,800 USD", method: "ACH" },
  { "name": "Sophie Taylor", location: "London, United Kingdom", amount: "£4,500 GBP", method: "Faster Payments" },
  { "name": "Li Wei", location: "Shanghai, China", amount: "¥25,000 CNY", method: "Alipay" },
  { "name": "Emma Müller", location: "Berlin, Germany", amount: "€3,200 EUR", method: "SEPA" },
  { "name": "Lucas Silva", location: "São Paulo, Brazil", amount: "R$6,700 BRL", method: "PIX" },
  { "name": "Hiroshi Tanaka", location: "Tokyo, Japan", amount: "¥850,000 JPY", method: "Bank Transfer" },
  { "name": "Olivia Brown", location: "Sydney, Australia", amount: "A$5,100 AUD", method: "PayID" },
  { "name": "Clara Dubois", location: "Paris, France", amount: "€2,900 EUR", method: "PayPal" },
  { "name": "Matteo Rossi", location: "Rome, Italy", amount: "€4,100 EUR", method: "SEPA" },
  { "name": "Sofia Martinez", location: "Madrid, Spain", amount: "€3,500 EUR", method: "Bank Transfer" },
  { "name": "Lars Jensen", location: "Copenhagen, Denmark", amount: "kr12,300 DKK", method: "MobilePay" },
  { "name": "Anna Nilsson", location: "Stockholm, Sweden", amount: "kr9,800 SEK", method: "Swish" },
  { "name": "Mei Ling", location: "Hong Kong, Hong Kong", amount: "HK$30,000 HKD", method: "FPS" },
  { "name": "Chinwe Okeke", location: "Lagos, Nigeria", amount: "₦1,200,000 NGN", method: "Paystack" },
  { "name": "Isabel Ferreira", location: "Lisbon, Portugal", amount: "€2,700 EUR", method: "MB WAY" },
  { "name": "Klara Nowak", location: "Warsaw, Poland", amount: "zł5,400 PLN", method: "BLIK" },
  { "name": "Tomas Novak", location: "Prague, Czech Republic", amount: "Kč22,000 CZK", method: "Bank Transfer" },
  { "name": "Evelyn Tan", location: "Singapore, Singapore", amount: "S$6,200 SGD", method: "PayNow" },
  { "name": "Min-Jae Kim", location: "Seoul, South Korea", amount: "₩1,500,000 KRW", method: "Bank Transfer" },
  { "name": "Amara Singh", location: "Delhi, India", amount: "₹53,900 INR", method: "UPI" },
  { "name": "Vivek Sharma", location: "Mumbai, India", amount: "₹81,200 INR", method: "IMPS" },
  { "name": "Shalini Rao", location: "Bangalore, India", amount: "₹47,600 INR", method: "Bank Transfer" },
  { "name": "Nikhil Patel", location: "Chennai, India", amount: "₹94,800 INR", method: "UPI" },
  { "name": "Deepa Nair", location: "Kolkata, India", amount: "₹66,300 INR", method: "IMPS" },
  { "name": "Ravi Gupta", location: "Hyderabad, India", amount: "₹78,900 INR", method: "UPI" },
  { "name": "Anjali Shah", location: "Ahmedabad, India", amount: "₹39,200 INR", method: "Bank Transfer" },
  { "name": "Kunal Desai", location: "Pune, India", amount: "₹85,400 INR", method: "UPI" },
  { "name": "Preeti Joshi", location: "Jaipur, India", amount: "₹72,700 INR", method: "IMPS" },
  { "name": "Siddharth Menon", location: "Lucknow, India", amount: "₹91,600 INR", method: "UPI" },
  { "name": "Michael Brown", location: "Chicago, United States", amount: "$12,300 USD", method: "PayPal" },
  { "name": "Emily Davis", location: "Los Angeles, United States", amount: "$4,900 USD", method: "Zelle" },
  { "name": "Thomas Clark", location: "Houston, United States", amount: "$8,700 USD", method: "ACH" },
  { "name": "Hannah Lewis", location: "San Francisco, United States", amount: "$15,200 USD", method: "PayPal" },
  { "name": "William Harris", location: "Boston, United States", amount: "$6,400 USD", method: "Zelle" },
  { "name": "Charlotte Walker", location: "Manchester, United Kingdom", amount: "£3,800 GBP", method: "Bank Transfer" },
  { "name": "George Evans", location: "Birmingham, United Kingdom", amount: "£7,200 GBP", method: "PayPal" },
  { "name": "Amelia King", location: "Glasgow, United Kingdom", amount: "£5,600 GBP", method: "Faster Payments" },
  { "name": "Oliver Scott", location: "Edinburgh, United Kingdom", amount: "£9,100 GBP", method: "Bank Transfer" },
  { "name": "Zhang Wei", location: "Beijing, China", amount: "¥18,500 CNY", method: "WeChat Pay" },
  { "name": "Chen Hui", location: "Guangzhou, China", amount: "¥42,300 CNY", method: "Bank Transfer" },
  { "name": "Wang Fang", location: "Shenzhen, China", amount: "¥29,700 CNY", method: "Alipay" },
  { "name": "Liu Ying", location: "Chengdu, China", amount: "¥15,400 CNY", method: "WeChat Pay" },
  { "name": "Sophie Weber", location: "Munich, Germany", amount: "€5,800 EUR", method: "PayPal" },
  { "name": "Lukas Schmidt", location: "Hamburg, Germany", amount: "€2,400 EUR", method: "SEPA" },
  { "name": "Anna Fischer", location: "Frankfurt, Germany", amount: "€7,600 EUR", method: "Bank Transfer" },
  { "name": "Marie Dubois", location: "Lyon, France", amount: "€4,300 EUR", method: "SEPA" },
  { "name": "Pierre Martin", location: "Marseille, France", amount: "€6,900 EUR", method: "PayPal" },
  { "name": "Luisa Conti", location: "Milan, Italy", amount: "€3,700 EUR", method: "Bank Transfer" },
  { "name": "Giovanni Russo", location: "Naples, Italy", amount: "€5,200 EUR", method: "SEPA" },
  { "name": "Riya Iyer", location: "Delhi, India", amount: "₹68,200 INR", method: "UPI" },
  { "name": "Arnav Shah", location: "Mumbai, India", amount: "₹93,500 INR", method: "IMPS" },
  { "name": "Tara Patel", location: "Bangalore, India", amount: "₹41,700 INR", method: "Bank Transfer" },
  { "name": "Karan Nair", location: "Chennai, India", amount: "₹86,300 INR", method: "UPI" },
  { "name": "Sanya Gupta", location: "Kolkata, India", amount: "₹74,900 INR", method: "IMPS" },
  { "name": "Vishal Rao", location: "Hyderabad, India", amount: "₹59,600 INR", method: "UPI" },
  { "name": "Aditi Sharma", location: "Ahmedabad, India", amount: "₹97,200 INR", method: "Bank Transfer" },
  { "name": "Rohan Joshi", location: "Pune, India", amount: "₹45,800 INR", method: "UPI" },
  { "name": "Nidhi Desai", location: "Jaipur, India", amount: "₹82,100 INR", method: "IMPS" },
  { "name": "Ajay Singh", location: "Lucknow, India", amount: "₹70,400 INR", method: "UPI" },
  { "name": "Isabella Lopez", location: "Barcelona, Spain", amount: "€4,800 EUR", method: "SEPA" },
  { "name": "Carlos Garcia", location: "Valencia, Spain", amount: "€2,600 EUR", method: "PayPal" },
  { "name": "Koen Visser", location: "Amsterdam, Netherlands", amount: "€3,900 EUR", method: "iDEAL" },
  { "name": "Lotte De Vries", location: "Rotterdam, Netherlands", amount: "€6,200 EUR", method: "SEPA" },
  { "name": "Erik Hansen", location: "Oslo, Norway", amount: "kr14,500 NOK", method: "Vipps" },
  { "name": "Ingrid Olsen", location: "Bergen, Norway", amount: "kr8,300 NOK", method: "Bank Transfer" },
  { "name": "Mika Salo", location: "Helsinki, Finland", amount: "€2,800 EUR", method: "Bank Transfer" },
  { "name": "Sofia Virtanen", location: "Tampere, Finland", amount: "€4,500 EUR", method: "PayPal" },
  { "name": "Ciara O’Brien", location: "Dublin, Ireland", amount: "€3,300 EUR", method: "SEPA" },
  { "name": "Liam Murphy", location: "Cork, Ireland", amount: "€5,700 EUR", method: "Bank Transfer" },
  { "name": "Priyanka Menon", location: "Delhi, India", amount: "₹77,800 INR", method: "UPI" },
  { "name": "Siddhant Kumar", location: "Mumbai, India", amount: "₹92,600 INR", method: "IMPS" },
  { "name": "Ananya Patel", location: "Bangalore, India", amount: "₹48,300 INR", method: "Bank Transfer" },
  { "name": "Vivek Nair", location: "Chennai, India", amount: "₹85,900 INR", method: "UPI" },
  { "name": "Shruti Gupta", location: "Kolkata, India", amount: "₹63,200 INR", method: "IMPS" },
  { "name": "Harish Rao", location: "Hyderabad, India", amount: "₹79,400 INR", method: "UPI" },
  { "name": "Naina Shah", location: "Ahmedabad, India", amount: "₹41,900 INR", method: "Bank Transfer" },
  { "name": "Kunal Joshi", location: "Pune, India", amount: "₹96,700 INR", method: "UPI" },
  { "name": "Riya Desai", location: "Jaipur, India", amount: "₹74,300 INR", method: "IMPS" },
  { "name": "Amitabh Singh", location: "Lucknow, India", amount: "₹88,600 INR", method: "UPI" },
  { "name": "Ava Lim", location: "Singapore, Singapore", amount: "S$8,400 SGD", method: "Bank Transfer" },
  { "name": "Wei Chen", location: "Taipei, Taiwan", amount: "NT$45,000 TWD", method: "Bank Transfer" },
  { "name": "Hana Park", location: "Busan, South Korea", amount: "₩1,200,000 KRW", method: "PayPal" },
  { "name": "Yuki Sato", location: "Osaka, Japan", amount: "¥650,000 JPY", method: "Bank Transfer" },
  { "name": "Siti Aisyah", location: "Kuala Lumpur, Malaysia", amount: "RM7,900 MYR", method: "Bank Transfer" },
  { "name": "Rina Susanti", location: "Jakarta, Indonesia", amount: "Rp18,500,000 IDR", method: "Bank Transfer" },
  { "name": "Maria Santos", location: "Manila, Philippines", amount: "₱25,000 PHP", method: "GCash" },
  { "name": "Nguyen Minh", location: "Ho Chi Minh City, Vietnam", amount: "₫22,000,000 VND", method: "Bank Transfer" },
  { "name": "Chaiya Srisuk", location: "Bangkok, Thailand", amount: "฿15,000 THB", method: "PromptPay" },
  { "name": "Ana Torres", location: "Mexico City, Mexico", amount: "$12,500 MXN", method: "Bank Transfer" },
  { "name": "Sanjana Iyer", location: "Delhi, India", amount: "₹69,400 INR", method: "UPI" },
  { "name": "Arjun Nair", location: "Mumbai, India", amount: "₹94,200 INR", method: "IMPS" },
  { "name": "Tanya Patel", location: "Bangalore, India", amount: "₹47,800 INR", method: "Bank Transfer" },
  { "name": "Ravi Sharma", location: "Chennai, India", amount: "₹81,600 INR", method: "UPI" },
  { "name": "Nisha Rao", location: "Kolkata, India", amount: "₹73,400 INR", method: "IMPS" },
  { "name": "Vikrant Gupta", location: "Hyderabad, India", amount: "₹59,900 INR", method: "UPI" },
  { "name": "Poonam Shah", location: "Ahmedabad, India", amount: "₹86,700 INR", method: "Bank Transfer" },
  { "name": "Kiran Joshi", location: "Pune, India", amount: "₹42,300 INR", method: "UPI" },
  { "name": "Suresh Desai", location: "Jaipur, India", amount: "₹95,100 INR", method: "IMPS" },
  { "name": "Anita Singh", location: "Lucknow, India", amount: "₹67,800 INR", method: "UPI" },
  { "name": "Mateo Vargas", location: "Bogota, Colombia", amount: "$5,600,000 COP", method: "PSE" },
  { "name": "Sofia Perez", location: "Medellin, Colombia", amount: "$3,900,000 COP", method: "Bank Transfer" },
  { "name": "Javier Gomez", location: "Santiago, Chile", amount: "$2,800,000 CLP", method: "Bank Transfer" },
  { "name": "Lucia Fernandez", location: "Buenos Aires, Argentina", amount: "$280,000 ARS", method: "Bank Transfer" },
  { "name": "Emma Wilson", location: "Toronto, Canada", amount: "C$6,400 CAD", method: "PayPal" },
  { "name": "Liam Tremblay", location: "Montreal, Canada", amount: "C$3,800 CAD", method: "Bank Transfer" },
  { "name": "Olivia Smith", location: "Vancouver, Canada", amount: "C$9,200 CAD", method: "PayPal" },
  { "name": "Noah Brown", location: "Auckland, New Zealand", amount: "NZ$5,700 NZD", method: "Bank Transfer" },
  { "name": "Zoe Taylor", location: "Wellington, New Zealand", amount: "NZ$3,400 NZD", method: "PayPal" },
  { "name": "Felix Wagner", location: "Vienna, Austria", amount: "€4,600 EUR", method: "SEPA" },
  { "name": "Julia Hofer", location: "Graz, Austria", amount: "€2,900 EUR", method: "Bank Transfer" },
  { "name": "Lena Müller", location: "Zurich, Switzerland", amount: "Fr.6,300 CHF", method: "Bank Transfer" },
  { "name": "Simon Keller", location: "Geneva, Switzerland", amount: "Fr.9,800 CHF", method: "PayPal" },
  { "name": "Eszter Nagy", location: "Budapest, Hungary", amount: "Ft1,200,000 HUF", method: "Bank Transfer" },
  { "name": "Ioana Popescu", location: "Bucharest, Romania", amount: "lei7,400 RON", method: "PayPal" },
  { "name": "Dimitris Papadopoulos", location: "Athens, Greece", amount: "€3,100 EUR", method: "SEPA" },
  { "name": "Aditya Menon", location: "Delhi, India", amount: "₹78,300 INR", method: "UPI" },
  { "name": "Sneha Patel", location: "Mumbai, India", amount: "₹91,400 INR", method: "IMPS" },
  { "name": "Rohan Gupta", location: "Bangalore, India", amount: "₹46,200 INR", method: "Bank Transfer" },
  { "name": "Priyanka Nair", location: "Chennai, India", amount: "₹84,500 INR", method: "UPI" },
  { "name": "Siddharth Shah", location: "Kolkata, India", amount: "₹69,700 INR", method: "IMPS" },
  { "name": "Ananya Joshi", location: "Hyderabad, India", amount: "₹93,800 INR", method: "UPI" },
  { "name": "Vikram Rao", location: "Ahmedabad, India", amount: "₹52,600 INR", method: "Bank Transfer" },
  { "name": "Neha Sharma", location: "Pune, India", amount: "₹77,200 INR", method: "UPI" },
  { "name": "Kunal Singh", location: "Jaipur, India", amount: "₹88,400 INR", method: "IMPS" },
  { "name": "Riya Desai", location: "Lucknow, India", amount: "₹64,900 INR", method: "UPI" },
  { "name": "David Lee", location: "New York, United States", amount: "$9,300 USD", method: "Zelle" },
  { "name": "Sarah Johnson", location: "Los Angeles, United States", amount: "$14,600 USD", method: "ACH" },
  { "name": "James Miller", location: "Chicago, United States", amount: "$5,800 USD", method: "PayPal" },
  { "name": "Lily Chen", location: "Shanghai, China", amount: "¥32,400 CNY", method: "Alipay" },
  { "name": "Zhou Li", location: "Beijing, China", amount: "¥19,800 CNY", method: "Bank Transfer" },
  { "name": "Jack Thomas", location: "London, United Kingdom", amount: "£6,900 GBP", method: "Faster Payments" },
  { "name": "Mia Harris", location: "Manchester, United Kingdom", amount: "£3,400 GBP", method: "PayPal" },
  { "name": "Sophie Laurent", location: "Paris, France", amount: "€5,100 EUR", method: "SEPA" },
  { "name": "Luca Bianchi", location: "Rome, Italy", amount: "€2,800 EUR", method: "Bank Transfer" },
  { "name": "Elena Garcia", location: "Madrid, Spain", amount: "€4,400 EUR", method: "PayPal" },
  { "name": "Arnav Kumar", location: "Delhi, India", amount: "₹71,500 INR", method: "UPI" },
  { "name": "Tara Shah", location: "Mumbai, India", amount: "₹89,200 INR", method: "IMPS" },
  { "name": "Karan Patel", location: "Bangalore, India", amount: "₹44,900 INR", method: "Bank Transfer" },
  { "name": "Sanya Nair", location: "Chennai, India", amount: "₹92,300 INR", method: "UPI" },
  { "name": "Vishal Gupta", location: "Kolkata, India", amount: "₹67,400 INR", method: "IMPS" },
  { "name": "Poonam Rao", location: "Hyderabad, India", amount: "₹85,600 INR", method: "UPI" },
  { "name": "Kiran Sharma", location: "Ahmedabad, India", amount: "₹53,200 INR", method: "Bank Transfer" },
  { "name": "Suresh Joshi", location: "Pune, India", amount: "₹78,900 INR", method: "UPI" },
  { "name": "Naina Desai", location: "Jaipur, India", amount: "₹96,400 INR", method: "IMPS" },
  { "name": "Amit Singh", location: "Lucknow, India", amount: "₹62,700 INR", method: "UPI" },
  { "name": "Hanna Berg", location: "Stockholm, Sweden", amount: "kr11,200 SEK", method: "Swish" },
  { "name": "Erik Lund", location: "Gothenburg, Sweden", amount: "kr7,600 SEK", method: "Bank Transfer" },
  { "name": "Mads Nielsen", location: "Copenhagen, Denmark", amount: "kr14,800 DKK", method: "MobilePay" },
  { "name": "Sofie Pedersen", location: "Aarhus, Denmark", amount: "kr9,300 DKK", method: "PayPal" },
  { "name": "Joao Costa", location: "Lisbon, Portugal", amount: "€3,600 EUR", method: "MB WAY" },
  { "name": "Ana Silva", location: "Porto, Portugal", amount: "€5,900 EUR", method: "SEPA" },
  { "name": "Marta Kowalska", location: "Warsaw, Poland", amount: "zł4,800 PLN", method: "BLIK" },
  { "name": "Piotr Zielinski", location: "Krakow, Poland", amount: "zł7,200 PLN", method: "Bank Transfer" },
  { "name": "Nora Lee", location: "Singapore, Singapore", amount: "S$4,900 SGD", method: "PayNow" },
  { "name": "Kai Wong", location: "Hong Kong, Hong Kong", amount: "HK$22,500 HKD", method: "FPS" },
  { "name": "Priya Menon", location: "Delhi, India", amount: "₹83,700 INR", method: "UPI" },
  { "name": "Siddhant Patel", location: "Mumbai, India", amount: "₹95,800 INR", method: "IMPS" },
  { "name": "Ananya Shah", location: "Bangalore, India", amount: "₹49,200 INR", method: "Bank Transfer" },
  { "name": "Vivek Nair", location: "Chennai, India", amount: "₹77,600 INR", method: "UPI" },
  { "name": "Shruti Gupta", location: "Kolkata, India", amount: "₹64,300 INR", method: "IMPS" },
  { "name": "Harish Rao", location: "Hyderabad, India", amount: "₹91,400 INR", method: "UPI" },
  { "name": "Naina Joshi", location: "Ahmedabad, India", amount: "₹58,700 INR", method: "Bank Transfer" },
  { "name": "Kunal Sharma", location: "Pune, India", amount: "₹82,900 INR", method: "UPI" },
  { "name": "Riya Desai", location: "Jaipur, India", amount: "₹70,200 INR", method: "IMPS" },
  { "name": "Amitabh Singh", location: "Lucknow, India", amount: "₹96,600 INR", method: "UPI" },
  { "name": "Chen Wei", location: "Shanghai, China", amount: "¥27,800 CNY", method: "WeChat Pay" },
  { "name": "Liu Fang", location: "Beijing, China", amount: "¥34,200 CNY", method: "Alipay" },
  { "name": "Emily Clark", location: "New York, United States", amount: "$11,400 USD", method: "ACH" },
  { "name": "Jacob White", location: "Los Angeles, United States", amount: "$7,200 USD", method: "PayPal" },
  { "name": "Isabella Green", location: "London, United Kingdom", amount: "£5,300 GBP", method: "Faster Payments" },
  { "name": "Lucas Almeida", location: "Rio de Janeiro, Brazil", amount: "R$8,400 BRL", method: "PIX" },
  { "name": "Sophie Becker", location: "Berlin, Germany", amount: "€3,900 EUR", method: "SEPA" },
  { "name": "Marie Leclerc", location: "Paris, France", amount: "€6,200 EUR", method: "PayPal" },
  { "name": "Antonio Esposito", location: "Rome, Italy", amount: "€4,700 EUR", method: "Bank Transfer" },
  { "name": "Clara Ruiz", location: "Madrid, Spain", amount: "€2,500 EUR", method: "SEPA" },
  { "name": "Aditya Patel", location: "Delhi, India", amount: "₹88,300 INR", method: "UPI" },
  { "name": "Sneha Nair", location: "Mumbai, India", amount: "₹94,600 INR", method: "IMPS" },
  { "name": "Rohan Shah", location: "Bangalore, India", amount: "₹47,100 INR", method: "Bank Transfer" },
  { "name": "Priyanka Gupta", location: "Chennai, India", amount: "₹81,900 INR", method: "UPI" },
  { "name": "Siddharth Joshi", location: "Kolkata, India", amount: "₹69,300 INR", method: "IMPS" },
  { "name": "Ananya Rao", location: "Hyderabad, India", amount: "₹92,700 INR", method: "UPI" },
  { "name": "Vikram Sharma", location: "Ahmedabad, India", amount: "₹55,400 INR", method: "Bank Transfer" },
  { "name": "Neha Desai", location: "Pune, India", amount: "₹78,600 INR", method: "UPI" },
  { "name": "Kunal Singh", location: "Jaipur, India", amount: "₹86,200 INR", method: "IMPS" },
  { "name": "Riya Menon", location: "Lucknow, India", amount: "₹63,800 INR", method: "UPI" },
  { "name": "Hiro Tanaka", location: "Tokyo, Japan", amount: "¥720,000 JPY", method: "PayPal" },
  { "name": "Soo-Jin Park", location: "Seoul, South Korea", amount: "₩1,800,000 KRW", method: "Bank Transfer" },
  { "name": "Wei Zhang", location: "Taipei, Taiwan", amount: "NT$38,000 TWD", method: "PayPal" },
  { "name": "Ava Goh", location: "Singapore, Singapore", amount: "S$7,300 SGD", method: "Bank Transfer" },
  { "name": "Fatima Ibrahim", location: "Lagos, Nigeria", amount: "₦950,000 NGN", method: "Paystack" },
  { "name": "Lucas Oliveira", location: "São Paulo, Brazil", amount: "R$12,600 BRL", method: "PIX" },
  { "name": "Zoe Martin", location: "Sydney, Australia", amount: "A$4,800 AUD", method: "PayID" },
  { "name": "Emma Larsen", location: "Copenhagen, Denmark", amount: "kr10,500 DKK", method: "MobilePay" },
  { "name": "Sofia Berg", location: "Stockholm, Sweden", amount: "kr8,200 SEK", method: "Swish" },
  { "name": "Ana Costa", location: "Lisbon, Portugal", amount: "€4,300 EUR", method: "MB WAY" },
  { "name": "Arjun Sharma", location: "Delhi, India", amount: "₹76,400 INR", method: "UPI" },
  { "name": "Tara Patel", location: "Mumbai, India", amount: "₹93,200 INR", method: "IMPS" },
  { "name": "Karan Nair", location: "Bangalore, India", amount: "₹48,600 INR", method: "Bank Transfer" },
  { "name": "Sanya Gupta", location: "Chennai, India", amount: "₹87,500 INR", method: "UPI" },
  { "name": "Vishal Shah", location: "Kolkata, India", amount: "₹71,300 INR", method: "IMPS" },
  { "name": "Poonam Rao", location: "Hyderabad, India", amount: "₹94,900 INR", method: "UPI" },
  { "name": "Kiran Joshi", location: "Ahmedabad, India", amount: "₹56,700 INR", method: "Bank Transfer" },
  { "name": "Suresh Desai", location: "Pune, India", amount: "₹79,200 INR", method: "UPI" },
  { "name": "Naina Singh", location: "Jaipur, India", amount: "₹85,400 INR", method: "IMPS" },
  { "name": "Amitabh Menon", location: "Lucknow, India", amount: "₹62,900 INR", method: "UPI" },
  { "name": "Anna Schmidt", location: "Berlin, Germany", amount: "€5,400 EUR", method: "SEPA" },
  { "name": "Pierre Dubois", location: "Paris, France", amount: "€3,200 EUR", method: "PayPal" },
  { "name": "Matteo Conti", location: "Rome, Italy", amount: "€6,800 EUR", method: "Bank Transfer" },
  { "name": "Sofia Lopez", location: "Madrid, Spain", amount: "€4,100 EUR", method: "SEPA" },
  { "name": "Lotte Jansen", location: "Amsterdam, Netherlands", amount: "€2,900 EUR", method: "iDEAL" },
  { "name": "Erik Olsen", location: "Oslo, Norway", amount: "kr13,600 NOK", method: "Vipps" },
  { "name": "Mika Virtanen", location: "Helsinki, Finland", amount: "€3,700 EUR", method: "Bank Transfer" },
  { "name": "Ciara Kelly", location: "Dublin, Ireland", amount: "€5,200 EUR", method: "PayPal" },
  { "name": "Tomas Svoboda", location: "Prague, Czech Republic", amount: "Kč18,500 CZK", method: "Bank Transfer" },
  { "name": "Marta Zielinska", location: "Warsaw, Poland", amount: "zł6,300 PLN", method: "BLIK" },
  { "name": "Aditya Nair", location: "Delhi, India", amount: "₹80,300 INR", method: "UPI" },
  { "name": "Sneha Shah", location: "Mumbai, India", amount: "₹92,400 INR", method: "IMPS" },
  { "name": "Rohan Patel", location: "Bangalore, India", amount: "₹49,800 INR", method: "Bank Transfer" },
  { "name": "Priyanka Joshi", location: "Chennai, India", amount: "₹86,700 INR", method: "UPI" },
  { "name": "Siddharth Gupta", location: "Kolkata, India", amount: "₹70,200 INR", method: "IMPS" },
  { "name": "Ananya Sharma", location: "Hyderabad, India", amount: "₹93,600 INR", method: "UPI" },
  { "name": "Vikram Desai", location: "Ahmedabad, India", amount: "₹54,300 INR", method: "Bank Transfer" },
  { "name": "Neha Rao", location: "Pune, India", amount: "₹78,800 INR", method: "UPI" },
  { "name": "Kunal Menon", location: "Jaipur, India", amount: "₹87,100 INR", method: "IMPS" },
  { "name": "Riya Singh", location: "Lucknow, India", amount: "₹64,600 INR", method: "UPI" },
  { "name": "Lucas Ferreira", location: "Rio de Janeiro, Brazil", amount: "R$7,900 BRL", method: "PIX" },
  { "name": "Sofia Vargas", location: "Bogota, Colombia", amount: "$4,800,000 COP", method: "PSE" },
  { "name": "Javier Morales", location: "Santiago, Chile", amount: "$3,200,000 CLP", method: "PayPal" },
  { "name": "Lucia Gomez", location: "Buenos Aires, Argentina", amount: "$310,000 ARS", method: "Bank Transfer" },
  { "name": "Emma Brown", location: "Toronto, Canada", amount: "C$5,800 CAD", method: "Bank Transfer" },
  { "name": "Liam Wilson", location: "Vancouver, Canada", amount: "C$8,300 CAD", method: "PayPal" },
  { "name": "Zoe Clark", location: "Auckland, New Zealand", amount: "NZ$6,200 NZD", method: "Bank Transfer" },
  { "name": "Felix Schmidt", location: "Vienna, Austria", amount: "€4,900 EUR", method: "SEPA" },
  { "name": "Lena Keller", location: "Zurich, Switzerland", amount: "Fr.7,400 CHF", method: "Bank Transfer" },
  { "name": "Ioana Radu", location: "Bucharest, Romania", amount: "lei8,100 RON", method: "Bank Transfer" },
  { "name": "Priya Sharma", location: "Delhi, India", amount: "₹77,900 INR", method: "UPI" },
  { "name": "Siddhant Nair", location: "Mumbai, India", amount: "₹94,500 INR", method: "IMPS" },
  { "name": "Ananya Patel", location: "Bangalore, India", amount: "₹48,200 INR", method: "Bank Transfer" },
  { "name": "Vivek Gupta", location: "Chennai, India", amount: "₹86,800 INR", method: "UPI" },
  { "name": "Shruti Shah", location: "Kolkata, India", amount: "₹69,400 INR", method: "IMPS" },
  { "name": "Harish Joshi", location: "Hyderabad, India", amount: "₹92,300 INR", method: "UPI" },
  { "name": "Naina Rao", location: "Ahmedabad, India", amount: "₹55,900 INR", method: "Bank Transfer" },
  { "name": "Kunal Desai", location: "Pune, India", amount: "₹79,600 INR", method: "UPI" },
  { "name": "Riya Menon", location: "Jaipur, India", amount: "₹87,800 INR", method: "IMPS" },
  { "name": "Amitabh Singh", location: "Lucknow, India", amount: "₹63,200 INR", method: "UPI" },
  { "name": "Hiroshi Sato", location: "Osaka, Japan", amount: "¥680,000 JPY", method: "Bank Transfer" },
  { "name": "Min-Jae Lee", location: "Seoul, South Korea", amount: "₩1,400,000 KRW", method: "PayPal" },
  { "name": "Wei Chen", location: "Taipei, Taiwan", amount: "NT$42,000 TWD", method: "Bank Transfer" },
  { "name": "Ava Tan", location: "Singapore, Singapore", amount: "S$6,800 SGD", method: "PayNow" },
  { "name": "Fatima Okeke", location: "Lagos, Nigeria", amount: "₦1,100,000 NGN", method: "Bank Transfer" },
  { "name": "Lucas Costa", location: "São Paulo, Brazil", amount: "R$9,200 BRL", method: "PIX" },
  { "name": "Zoe Wilson", location: "Sydney, Australia", amount: "A$5,400 AUD", method: "PayID" },
  { "name": "Emma Nielsen", location: "Copenhagen, Denmark", amount: "kr11,900 DKK", method: "MobilePay" },
  { "name": "Sofia Larsson", location: "Stockholm, Sweden", amount: "kr7,800 SEK", method: "Swish" },
  { "name": "Ana Ferreira", location: "Lisbon, Portugal", amount: "€4,600 EUR", method: "MB WAY" },
  { "name": "Aditya Shah", location: "Delhi, India", amount: "₹80,600 INR", method: "UPI" },
  { "name": "Sneha Patel", location: "Mumbai, India", amount: "₹93,900 INR", method: "IMPS" },
  { "name": "Rohan Nair", location: "Bangalore, India", amount: "₹47,400 INR", method: "Bank Transfer" },
  { "name": "Priyanka Sharma", location: "Chennai, India", amount: "₹87,200 INR", method: "UPI" },
  { "name": "Siddharth Gupta", location: "Kolkata, India", amount: "₹70,800 INR", method: "IMPS" },
  { "name": "Ananya Joshi", location: "Hyderabad, India", amount: "₹94,100 INR", method: "UPI" },
  { "name": "Vikram Rao", location: "Ahmedabad, India", amount: "₹54,600 INR", method: "Bank Transfer" },
  { "name": "Neha Desai", location: "Pune, India", amount: "₹79,300 INR", method: "UPI" },
  { "name": "Kunal Singh", location: "Jaipur, India", amount: "₹86,900 INR", method: "IMPS" },
  { "name": "Riya Menon", location: "Lucknow, India", amount: "₹63,400 INR", method: "UPI" },
  { "name": "Anna Weber", location: "Berlin, Germany", amount: "€5,600 EUR", method: "SEPA" },
  { "name": "Pierre Martin", location: "Paris, France", amount: "€3,400 EUR", method: "PayPal" },
  { "name": "Matteo Russo", location: "Rome, Italy", amount: "€6,900 EUR", method: "Bank Transfer" },
  { "name": "Sofia Garcia", location: "Madrid, Spain", amount: "€4,200 EUR", method: "SEPA" },
  { "name": "Lotte De Vries", location: "Amsterdam, Netherlands", amount: "€3,100 EUR", method: "iDEAL" },
  { "name": "Erik Hansen", location: "Oslo, Norway", amount: "kr14,200 NOK", method: "Vipps" },
  { "name": "Mika Salo", location: "Helsinki, Finland", amount: "€3,900 EUR", method: "Bank Transfer" },
  { "name": "Ciara Murphy", location: "Dublin, Ireland", amount: "€5,400 EUR", method: "PayPal" },
  { "name": "Tomas Novak", location: "Prague, Czech Republic", amount: "Kč19,200 CZK", method: "Bank Transfer" },
  { "name": "Marta Nowak", location: "Warsaw, Poland", amount: "zł6,500 PLN", method: "BLIK" },
  { "name": "Priya Nair", location: "Delhi, India", amount: "₹81,200 INR", method: "UPI" },
  { "name": "Siddhant Shah", location: "Mumbai, India", amount: "₹94,700 INR", method: "IMPS" },
  { "name": "Ananya Patel", location: "Bangalore, India", amount: "₹48,900 INR", method: "Bank Transfer" },
  { "name": "Vivek Gupta", location: "Chennai, India", amount: "₹87,400 INR", method: "UPI" },
  { "name": "Shruti Joshi", location: "Kolkata, India", amount: "₹69,900 INR", method: "IMPS" },
  { "name": "Harish Rao", location: "Hyderabad, India", amount: "₹92,800 INR", method: "UPI" },
  { "name": "Naina Sharma", location: "Ahmedabad, India", amount: "₹55,100 INR", method: "Bank Transfer" },
  { "name": "Kunal Desai", location: "Pune, India", amount: "₹79,800 INR", method: "UPI" },
  { "name": "Riya Singh", location: "Jaipur, India", amount: "₹87,300 INR", method: "IMPS" },
  { "name": "Amitabh Menon", location: "Lucknow, India", amount: "₹63,600 INR", method: "UPI" },
  { "name": "Lucas Silva", location: "Rio de Janeiro, Brazil", amount: "R$8,600 BRL", method: "PIX" },
  { "name": "Sofia Torres", location: "Bogota, Colombia", amount: "$5,200,000 COP", method: "PSE" },
  { "name": "Javier Fernandez", location: "Santiago, Chile", amount: "$3,400,000 CLP", method: "Bank Transfer" },
  { "name": "Lucia Perez", location: "Buenos Aires, Argentina", amount: "$290,000 ARS", method: "PayPal" },
  { "name": "Emma Wilson", location: "Toronto, Canada", amount: "C$6,100 CAD", method: "Bank Transfer" },
  { "name": "Liam Brown", location: "Vancouver, Canada", amount: "C$8,900 CAD", method: "PayPal" },
  { "name": "Zoe Taylor", location: "Auckland, New Zealand", amount: "NZ$5,900 NZD", method: "Bank Transfer" },
  { "name": "Felix Weber", location: "Vienna, Austria", amount: "€5,100 EUR", method: "SEPA" },
  { "name": "Lena Müller", location: "Zurich, Switzerland", amount: "Fr.7,600 CHF", method: "PayPal" },
  { "name": "Ioana Popescu", location: "Bucharest, Romania", amount: "lei8,300 RON", method: "Bank Transfer" },
  { "name": "Aditya Patel", location: "Delhi, India", amount: "₹80,800 INR", method: "UPI" },
  { "name": "Sneha Nair", location: "Mumbai, India", amount: "₹94,200 INR", method: "IMPS" },
  { "name": "Rohan Shah", location: "Bangalore, India", amount: "₹47,600 INR", method: "Bank Transfer" },
  { "name": "Priyanka Gupta", location: "Chennai, India", amount: "₹87,700 INR", method: "UPI" },
  { "name": "Siddharth Joshi", location: "Kolkata, India", amount: "₹70,400 INR", method: "IMPS" },
  { "name": "Ananya Sharma", location: "Hyderabad, India", amount: "₹93,900 INR", method: "UPI" },
  { "name": "Vikram Rao", location: "Ahmedabad, India", amount: "₹54,800 INR", method: "Bank Transfer" },
  { "name": "Neha Desai", location: "Pune, India", amount: "₹79,400 INR", method: "UPI" },
  { "name": "Kunal Singh", location: "Jaipur, India", amount: "₹87,000 INR", method: "IMPS" },
  { "name": "Riya Menon", location: "Lucknow, India", amount: "₹63,900 INR", method: "UPI" },
  { "name": "Hiro Tanaka", location: "Tokyo, Japan", amount: "¥710,000 JPY", method: "PayPal" },
  { "name": "Soo-Jin Kim", location: "Seoul, South Korea", amount: "₩1,600,000 KRW", method: "Bank Transfer" },
  { "name": "Wei Zhang", location: "Taipei, Taiwan", amount: "NT$40,000 TWD", method: "PayPal" },
  { "name": "Ava Lim", location: "Singapore, Singapore", amount: "S$7,100 SGD", method: "Bank Transfer" },
  { "name": "Fatima Ibrahim", location: "Lagos, Nigeria", amount: "₦1,050,000 NGN", method: "Paystack" },
  { "name": "Lucas Almeida", location: "São Paulo, Brazil", amount: "R$9,400 BRL", method: "PIX" },
  { "name": "Zoe Martin", location: "Sydney, Australia", amount: "A$5,600 AUD", method: "PayID" },
  { "name": "Emma Larsen", location: "Copenhagen, Denmark", amount: "kr12,100 DKK", method: "MobilePay" },
  { "name": "Sofia Berg", location: "Stockholm, Sweden", amount: "kr7,900 SEK", method: "Swish" },
  { "name": "Ana Costa", location: "Lisbon, Portugal", amount: "€4,800 EUR", method: "MB WAY" },
  { "name": "Priya Sharma", location: "Delhi, India", amount: "₹81,400 INR", method: "UPI" },
  { "name": "Siddhant Nair", location: "Mumbai, India", amount: "₹94,800 INR", method: "IMPS" },
  { "name": "Ananya Patel", location: "Bangalore, India", amount: "₹48,300 INR", method: "Bank Transfer" },
  { "name": "Vivek Gupta", location: "Chennai, India", amount: "₹87,300 INR", method: "UPI" },
  { "name": "Shruti Shah", location: "Kolkata, India", amount: "₹70,900 INR", method: "IMPS" },
  { "name": "Harish Joshi", location: "Hyderabad, India", amount: "₹93,200 INR", method: "UPI" },
  { "name": "Naina Rao", location: "Ahmedabad, India", amount: "₹55,600 INR", method: "Bank Transfer" },
  { "name": "Kunal Desai", location: "Pune, India", amount: "₹79,900 INR", method: "UPI" },
  { "name": "Riya Singh", location: "Jaipur, India", amount: "₹87,500 INR", method: "IMPS" },
  { "name": "Amitabh Menon", location: "Lucknow, India", amount: "₹63,300 INR", method: "UPI" },
  { "name": "Lucas Ferreira", location: "Rio de Janeiro, Brazil", amount: "R$8,800 BRL", method: "PIX" },
  { "name": "Sofia Vargas", location: "Bogota, Colombia", amount: "$5,400,000 COP", method: "PSE" },
  { "name": "Javier Morales", location: "Santiago, Chile", amount: "$3,600,000 CLP", method: "Bank Transfer" },
  { "name": "Lucia Gomez", location: "Buenos Aires, Argentina", amount: "$300,000 ARS", method: "PayPal" },
  { "name": "Emma Brown", location: "Toronto, Canada", amount: "C$6,300 CAD", method: "Bank Transfer" },
  { "name": "Liam Wilson", location: "Vancouver, Canada", amount: "C$9,100 CAD", method: "PayPal" },
  { "name": "Zoe Clark", location: "Auckland, New Zealand", amount: "NZ$6,400 NZD", method: "Bank Transfer" },
  { "name": "Felix Schmidt", location: "Vienna, Austria", amount: "€5,300 EUR", method: "SEPA" },
  { "name": "Lena Keller", location: "Zurich, Switzerland", amount: "Fr.7,800 CHF", method: "PayPal" },
  { "name": "Ioana Radu", location: "Bucharest, Romania", amount: "lei8,500 RON", method: "Bank Transfer" },
  { "name": "Aditya Shah", location: "Delhi, India", amount: "₹80,900 INR", method: "UPI" },
  { "name": "Sneha Nair", location: "Mumbai, India", amount: "₹94,300 INR", method: "IMPS" },
  { "name": "Rohan Patel", location: "Bangalore, India", amount: "₹47,700 INR", method: "Bank Transfer" },
  { "name": "Priyanka Sharma", location: "Chennai, India", amount: "₹87,800 INR", method: "UPI" },
  { "name": "Siddharth Gupta", location: "Kolkata, India", amount: "₹70,300 INR", method: "IMPS" },
  { "name": "Ananya Joshi", location: "Hyderabad, India", amount: "₹94,000 INR", method: "UPI" },
  { "name": "Vikram Rao", location: "Ahmedabad, India", amount: "₹54,900 INR", method: "Bank Transfer" },
  { "name": "Neha Desai", location: "Pune, India", amount: "₹79,500 INR", method: "UPI" },
  { "name": "Kunal Singh", location: "Jaipur, India", amount: "₹87,100 INR", method: "IMPS" },
  { "name": "Riya Menon", location: "Lucknow, India", amount: "₹63,800 INR", method: "UPI" },
  { "name": "Hiroshi Sato", location: "Osaka, Japan", amount: "¥690,000 JPY", method: "Bank Transfer" },
  { "name": "Min-Jae Lee", location: "Seoul, South Korea", amount: "₩1,500,000 KRW", method: "PayPal" },
  { "name": "Wei Chen", location: "Taipei, Taiwan", amount: "NT$41,000 TWD", method: "Bank Transfer" },
  { "name": "Ava Tan", location: "Singapore, Singapore", amount: "S$7,200 SGD", method: "PayNow" },
  { "name": "Fatima Okeke", location: "Lagos, Nigeria", amount: "₦1,080,000 NGN", method: "Bank Transfer" },
  { "name": "Lucas Costa", location: "São Paulo, Brazil", amount: "R$9,600 BRL", method: "PIX" },
  { "name": "Zoe Wilson", location: "Sydney, Australia", amount: "A$5,800 AUD", method: "PayID" },
  { "name": "Emma Nielsen", location: "Copenhagen, Denmark", amount: "kr12,300 DKK", method: "MobilePay" },
  { "name": "Sofia Larsson", location: "Stockholm, Sweden", amount: "kr8,000 SEK", method: "Swish" },
  { "name": "Ana Ferreira", location: "Lisbon, Portugal", amount: "€4,900 EUR", method: "MB WAY" },
  { "name": "Priya Sharma", location: "Delhi, India", amount: "₹81,600 INR", method: "UPI" },
  { "name": "Siddhant Nair", location: "Mumbai, India", amount: "₹94,900 INR", method: "IMPS" },
  { "name": "Ananya Patel", location: "Bangalore, India", amount: "₹48,400 INR", method: "Bank Transfer" },
  { "name": "Vivek Gupta", location: "Chennai, India", amount: "₹87,400 INR", method: "UPI" },
  { "name": "Shruti Shah", location: "Kolkata, India", amount: "₹71,000 INR", method: "IMPS" },
  { "name": "Harish Joshi", location: "Hyderabad, India", amount: "₹93,300 INR", method: "UPI" },
  { "name": "Naina Rao", location: "Ahmedabad, India", amount: "₹55,700 INR", method: "Bank Transfer" },
  { "name": "Kunal Desai", location: "Pune, India", amount: "₹80,000 INR", method: "UPI" },
  { "name": "Riya Singh", location: "Jaipur, India", amount: "₹87,600 INR", method: "IMPS" },
  { "name": "Amitabh Menon", location: "Lucknow, India", amount: "₹63,400 INR", method: "UPI" },
  { "name": "Lucas Silva", location: "Rio de Janeiro, Brazil", amount: "R$8,900 BRL", method: "PIX" },
  { "name": "Sofia Torres", location: "Bogota, Colombia", amount: "$5,500,000 COP", method: "PSE" },
  { "name": "Javier Fernandez", location: "Santiago, Chile", amount: "$3,700,000 CLP", method: "PayPal" },
  { "name": "Lucia Gomez", location: "Buenos Aires, Argentina", amount: "$310,000 ARS", method: "Bank Transfer" },
  { "name": "Emma Brown", location: "Toronto, Canada", amount: "C$6,400 CAD", method: "Bank Transfer" },
  { "name": "Liam Wilson", location: "Vancouver, Canada", amount: "C$9,200 CAD", method: "PayPal" },
  { "name": "Zoe Clark", location: "Auckland, New Zealand", amount: "NZ$6,500 NZD", method: "Bank Transfer" },
  { "name": "Felix Schmidt", location: "Vienna, Austria", amount: "€5,400 EUR", method: "SEPA" },
  { "name": "Lena Keller", location: "Zurich, Switzerland", amount: "Fr.7,900 CHF", method: "PayPal" },
  { "name": "Ioana Popescu", location: "Bucharest, Romania", amount: "lei8,600 RON", method: "Bank Transfer" },
  { "name": "Aditya Shah", location: "Delhi, India", amount: "₹81,000 INR", method: "UPI" },
  { "name": "Sneha Nair", location: "Mumbai, India", amount: "₹94,400 INR", method: "IMPS" },
  { "name": "Rohan Patel", location: "Bangalore, India", amount: "₹47,800 INR", method: "Bank Transfer" },
  { "name": "Priyanka Sharma", location: "Chennai, India", amount: "₹87,900 INR", method: "UPI" },
  { "name": "Siddharth Gupta", location: "Kolkata, India", amount: "₹71,100 INR", method: "IMPS" },
  { "name": "Ananya Joshi", location: "Hyderabad, India", amount: "₹94,100 INR", method: "UPI" },
  { "name": "Vikram Rao", location: "Ahmedabad, India", amount: "₹55,000 INR", method: "Bank Transfer" },
  { "name": "Neha Desai", location: "Pune, India", amount: "₹79,600 INR", method: "UPI" },
  { "name": "Kunal Singh", location: "Jaipur, India", amount: "₹87,200 INR", method: "IMPS" },
  { "name": "Riya Menon", location: "Lucknow, India", amount: "₹63,900 INR", method: "UPI" },
  { "name": "Hiroshi Sato", location: "Osaka, Japan", amount: "¥700,000 JPY", method: "Bank Transfer" },
  { "name": "Min-Jae Lee", location: "Seoul, South Korea", amount: "₩1,550,000 KRW", method: "PayPal" },
  { "name": "Wei Chen", location: "Taipei, Taiwan", amount: "NT$42,000 TWD", method: "Bank Transfer" },
  { "name": "Ava Tan", location: "Singapore, Singapore", amount: "S$7,300 SGD", method: "PayNow" },
  { "name": "Fatima Okeke", location: "Lagos, Nigeria", amount: "₦1,090,000 NGN", method: "Bank Transfer" },
] as Array<{ name: string; location: string; amount: string; method: string }>;

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  walletConnected: boolean;
  walletAddress: string;
  showWalletAnimation: boolean;
  themeClasses: ThemeClasses;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  walletConnected,
  walletAddress,
  showWalletAnimation,
  themeClasses,
  isMobile = false,
}) => {
  const [payoutQueue, setPayoutQueue] = React.useState<number[]>([]);
  const [currentPayoutIndex, setCurrentPayoutIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [timeRemaining, setTimeRemaining] = React.useState(20);
  const { t } = useTranslation();

  // Detect official domain on client
  const [isOfficialDomain, setIsOfficialDomain] = React.useState(false);
  React.useEffect(() => {
    try {
      const host = window.location.hostname?.toLowerCase() || '';
      setIsOfficialDomain(host.endsWith('securep2p.pro'));
    } catch {
      setIsOfficialDomain(false);
    }
  }, []);

  // Phishing alert dismissed state
  const [showPhishAlert, setShowPhishAlert] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('phishAlertDismissed') !== 'true';
    } catch {
      return true;
    }
  });

  // Force-show yellow alert on non-official domains
  React.useEffect(() => {
    if (!isOfficialDomain) {
      setShowPhishAlert(true);
      try { localStorage.removeItem('phishAlertDismissed'); } catch {}
    }
  }, [isOfficialDomain]);

  // Timer constants
  const PAYOUT_DURATION = 20000;
  const FADE_DURATION = 500;
  const STORAGE_KEY = 'payoutTimer';
  const QUEUE_KEY = 'payoutQueue';

  // Init synchronized queue/timer
  React.useEffect(() => {
    const shuffleArray = (a: number[]) => {
      const s = [...a];
      for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
      }
      return s;
    };
    const now = Date.now();
    let timerStart = localStorage.getItem(STORAGE_KEY);
    if (!timerStart) {
      timerStart = now.toString();
      localStorage.setItem(STORAGE_KEY, timerStart);
    }
    const elapsed = now - parseInt(timerStart);
    const cyclePosition = Math.floor(elapsed / PAYOUT_DURATION);
    const timeInCurrentCycle = elapsed % PAYOUT_DURATION;

    const storedQueue = localStorage.getItem(QUEUE_KEY);
    let queue: number[] = storedQueue
      ? JSON.parse(storedQueue)
      : shuffleArray(Array.from({ length: recentPayouts.length }, (_, i) => i));
    if (!storedQueue) localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));

    const currentQueueIndex = cyclePosition % queue.length;

    if (cyclePosition > 0 && cyclePosition % queue.length === 0 && timeInCurrentCycle < 1000) {
      queue = shuffleArray(Array.from({ length: recentPayouts.length }, (_, i) => i));
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    }

    setPayoutQueue(queue);
    setCurrentPayoutIndex(queue[currentQueueIndex]);
    setIsVisible(timeInCurrentCycle < (PAYOUT_DURATION - FADE_DURATION));
    setTimeRemaining(Math.ceil((PAYOUT_DURATION - timeInCurrentCycle) / 1000));
  }, []);

  // Tick
  React.useEffect(() => {
    if (!payoutQueue.length) return;
    const update = () => {
      const now = Date.now();
      const timerStart = parseInt(localStorage.getItem(STORAGE_KEY) || now.toString());
      const elapsed = now - timerStart;
      const cyclePosition = Math.floor(elapsed / PAYOUT_DURATION);
      const timeInCurrentCycle = elapsed % PAYOUT_DURATION;

      setTimeRemaining(Math.ceil((PAYOUT_DURATION - timeInCurrentCycle) / 1000));
      setIsVisible(timeInCurrentCycle < (PAYOUT_DURATION - FADE_DURATION));

      const idx = cyclePosition % payoutQueue.length;
      const expected = payoutQueue[idx];
      if (currentPayoutIndex !== expected) setCurrentPayoutIndex(expected);
    };
    update();
    const id = setInterval(update, 100);
    return () => clearInterval(id);
  }, [payoutQueue, currentPayoutIndex]);

  const currentPayout =
    recentPayouts[currentPayoutIndex] ?? { name: '—', location: '—', amount: '—', method: '—' };

  return (
    <>
      {/* SECURITY RIBBONS (above header); give higher z-index so they are clickable */}
      {!(isMobile && walletConnected) && (
        <div className="relative z-50 pointer-events-auto">
          {/* Green safe ribbon on official domain (not dismissible) */}
          {isOfficialDomain && (
            <div
              className={
                darkMode
                  ? 'bg-emerald-950 border-b border-emerald-900 text-emerald-200'
                  : 'bg-emerald-50 border-b border-emerald-200 text-emerald-800'
              }
              role="status"
            >
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-10 flex items-center gap-2 text-xs sm:text-sm">
                <CheckCircle className={darkMode ? 'w-4 h-4 text-emerald-400' : 'w-4 h-4 text-emerald-700'} />
                <span className="font-medium">
                  You’re on the <span className="font-semibold">official safe site</span> —{' '}
                  <span className="font-semibold">securep2p.pro</span>
                </span>
              </div>
            </div>
          )}

          {/* Yellow phishing warning (dismissible) */}
          {showPhishAlert && (
            <div
              className={
                darkMode
                  ? 'bg-yellow-950 border-b border-yellow-900 text-yellow-100'
                  : 'bg-amber-50 border-b border-amber-200 text-amber-900'
              }
            >
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-2.5 flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2">
                  <div className="flex items-center justify-center rounded-md bg-black/5 dark:bg-white/10 p-1.5">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-xs sm:text-sm leading-snug">
                    <span className="font-semibold">Phishing Alert:</span>{' '}
                    Only trust{' '}
                    <a
                      href="https://securep2p.pro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-current underline-offset-2 font-semibold"
                    >
                      securep2p.pro
                    </a>
                    . All other domains, bots, or look-alikes are <strong>scams</strong>. Always verify the URL.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowPhishAlert(false);
                    try { localStorage.setItem('phishAlertDismissed', 'true'); } catch {}
                  }}
                  className="shrink-0 text-xs font-semibold px-2 py-1 rounded hover:opacity-80"
                  aria-label="Dismiss phishing alert"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HEADER stays under ribbons so it won't block clicks */}
      <header
        className={`${themeClasses.cardBg}/80 backdrop-blur-xl border-b ${themeClasses.border} sticky top-0 z-40 shadow-lg ${
          isMobile && walletConnected ? 'py-2' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`flex justify-between items-center ${isMobile && walletConnected ? 'h-12' : 'h-16 sm:h-20'}`}>
            {/* Logo */}
            <div className={`flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ${isMobile && walletConnected ? 'scale-75' : ''}`}>
              <div className="flex items-center">
                <div className={`${isMobile && walletConnected ? 'w-6 h-6' : 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'} bg-gradient-to-r ${themeClasses.gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl`}>
                  <Wallet className={`${isMobile && walletConnected ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7'} text-white`} />
                </div>
                <div className={`${isMobile && walletConnected ? 'ml-1' : 'ml-2'}`}>
                  <span className={`${isMobile && walletConnected ? 'text-sm' : 'text-lg sm:text-xl lg:text-2xl'} font-bold ${themeClasses.text}`}>
                    Securep2p.pro
                  </span>
                  {!(isMobile && walletConnected) && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-medium">SECURE</span>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full font-medium">VERIFIED</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center Status */}
            {!(isMobile && walletConnected) && (
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <div className="flex items-center space-x-3 lg:space-x-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    <span className={themeClasses.textSecondary}>{t('header.liveRates')}</span>
                  </div>
                  <div className="flex items-center">
                    <Wifi className="w-4 h-4 text-green-600 mr-1" />
                    <span className={themeClasses.textSecondary}>{t('header.connected')}</span>
                  </div>
                </div>

                {walletConnected && (
                  <div className={`flex items-center bg-gradient-to-r ${darkMode ? 'from-green-900/10 to-emerald-900/10' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-800/30' : 'border-green-200'} px-3 py-2 rounded-lg lg:rounded-xl transition-all duration-500 backdrop-blur-sm ${showWalletAnimation ? 'ring-4 ring-green-300 ring-opacity-50 scale-105' : ''}`}>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
                    <div className="text-xs">
                      <div className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} hidden lg:block`}>BSC Network</div>
                    </div>
                    {showWalletAnimation && <div className="ml-1 lg:ml-2"><CheckCircle className="w-5 h-5 text-green-600 animate-bounce" /></div>}
                  </div>
                )}
              </div>
            )}

            {/* Right Controls */}
            {!(isMobile && walletConnected) && (
              <div className="flex items-center space-x-2">
                <LanguageSelector darkMode={darkMode} themeClasses={themeClasses} />
                <button
                  onClick={() => {
                    const newTheme = !darkMode;
                    setDarkMode(newTheme);
                    try { localStorage.setItem('theme', newTheme ? 'dark' : 'light'); } catch {}
                  }}
                  className={`p-2 rounded-lg sm:rounded-xl ${themeClasses.hover} transition-all duration-200 border ${themeClasses.border}`}
                >
                  {darkMode ? <Sun className={`w-4 h-4 sm:w-5 sm:h-5 ${themeClasses.text}`} /> : <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${themeClasses.text}`} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Live Payouts Ticker */}
      {!(isMobile && walletConnected) && (
        <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900/50 via-cyan-900/50 to-blue-900/50' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600'} text-white py-2 sm:py-3 overflow-hidden relative border-b border-blue-500/30 backdrop-blur-sm`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" />
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            {/* Desktop */}
            <div className={`hidden lg:flex items-center justify-center space-x-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium">{t('header.livePayout')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{currentPayout.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-blue-100">from</span>
                <span className="text-sm font-medium">{currentPayout.location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                <span className="text-sm font-bold">{currentPayout.amount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-blue-100">via</span>
                <span className="text-sm font-medium bg-white/20 rounded-full px-2 py-1">{currentPayout.method}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-100" />
                <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-200" />
              </div>
            </div>

            {/* Mobile */}
            <div className={`lg:hidden transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <div className="flex items-center justify-between px-1 sm:px-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-bold bg-white/20 rounded-full px-1.5 py-0.5 backdrop-blur-sm whitespace-nowrap">
                      LIVE PAYOUT
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 min-w-0">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-2.5 h-2.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate max-w-16 sm:max-w-20">{currentPayout.name}</div>
                      <div className="text-xs text-blue-100 truncate max-w-16 sm:max-w-20">{currentPayout.location}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-white whitespace-nowrap">{currentPayout.amount}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="w-2.5 h-2.5 text-blue-300" />
                    <span className="text-xs text-blue-100 font-medium whitespace-nowrap">via {currentPayout.method}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;
