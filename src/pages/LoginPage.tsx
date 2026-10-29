// LoginPage.tsx
import React, { useMemo, useState } from 'react';
import { Eye, EyeOff, Globe, Moon, Sun, MapPin, Plane, Camera } from 'lucide-react';
import { User } from '../types/User';
import { translations } from '../utils/translations';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginPageProps {
  onLogin: (user: User) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: 'en' | 'hi' | 'mr';
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isDarkMode, toggleDarkMode, language }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const t = translations[language];

  // ---------- Yup Schemas ----------
  const signInSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
      }),
    []
  );

  const signUpSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .matches(/^[A-Za-z]{2,}$/, 'Use only letters')
          .required('First name is required'),
        lastName: Yup.string()
          .matches(/^[A-Za-z]{2,}$/, 'Use only letters')
          .required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string()
          .min(6, 'Min 6 characters')
          .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Use letters & numbers')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Please confirm password'),
      }),
    []
  );

  // ---------- Formik ----------
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: isSignUp ? signUpSchema : signInSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        const url = `http://localhost:5000/api/${isSignUp ? 'register' : 'login'}`;
        const payload = isSignUp
          ? {
              name: `${values.firstName} ${values.lastName}`.trim(),
              email: values.email,
              password: values.password,
            }
          : {
              email: values.email,
              password: values.password,
            };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        // ✅ Login failed & user not found → switch to SignUp form
        if (!res.ok || data?.success === false) {
          if (!isSignUp && (data?.message?.toLowerCase().includes("not found") || data?.message?.toLowerCase().includes("no user"))) {
            setServerError("User not found. Please sign up first.");
            setIsSignUp(true); // switch to SignUp form
          } else {
            setServerError(data?.message || 'Something went wrong');
          }
          return;
        }

        // Build user for app state
        const user: User = {
          _id: data.user?._id || Date.now().toString(),
          name: data.user?.name || `${values.firstName} ${values.lastName}`.trim(),
          email: data.user?.email || values.email,
          role: (data.user?.role as 'admin' | 'user') ?? 'user',
          isPremium: data.user?.isPremium ?? false,
          trips: [],
        };

        // Persist
        if (data.token) localStorage.setItem('token', data.token);
        localStorage.setItem('travelPlannerUser', JSON.stringify(user));

        onLogin(user);
      } catch (err) {
        console.error(err);
        setServerError('Server error. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const backgroundImages = [
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920',
  ];

  // helper for red border if error visible
  const fieldClass = (name: keyof typeof formik.values) =>
    `w-full px-4 py-3 border rounded-lg transition-colors dark:bg-gray-700 dark:text-white
     ${
       formik.touched[name] && formik.errors[name]
         ? 'border-red-500 focus:ring-red-500'
         : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
     }`;

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative h-full">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TravelAI Pro</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-white hover:text-blue-400 rounded-md transition-colors"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">{t.hero.title}</h1>
            <p className="text-xl text-gray-200">{t.hero.subtitle}</p>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mb-3">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium">{t.features.destinations}</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mb-3">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium">{t.features.planning}</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mb-3">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium">{t.features.experiences}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isSignUp ? t.auth.signUp : t.auth.signIn}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isSignUp ? t.auth.createAccount : t.auth.welcomeBack}
              </p>
            </div>

            {/* server error banner */}
            {serverError && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                {serverError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter First Name"
                      className={fieldClass('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Last Name"
                      className={fieldClass('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.auth.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={fieldClass('email')}
                  placeholder={t.auth.enterEmail}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.auth.password}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${fieldClass('password')} pr-12`}
                    placeholder={t.auth.enterPassword}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                )}
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.auth.confirmPassword}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={fieldClass('confirmPassword')}
                    placeholder={t.auth.confirmPassword}
                    autoComplete="new-password"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={formik.isSubmitting || !formik.isValid || (isSignUp && !formik.dirty && !serverError)}
              >
                {isSignUp ? t.auth.signUp : t.auth.signIn}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {isSignUp ? t.auth.haveAccount : t.auth.noAccount}{' '}
                <button
                  onClick={() => {
                    setIsSignUp((v) => !v);
                    setServerError('');
                    // reset errors/touched when switching mode
                    formik.resetForm();
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  {isSignUp ? t.auth.signIn : t.auth.signUp}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;   