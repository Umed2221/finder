/*
  # Initial database schema

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - username (text, unique)
      - name (text)
      - is_employer (boolean)
      - created_at (timestamp)
    
    - vacancies
      - id (uuid, primary key)
      - title (text)
      - company (text)
      - location (text)
      - salary (text)
      - description (text)
      - requirements (text[])
      - employer_id (uuid, references users)
      - created_at (timestamp)
      - category (text)
      - work_type (text)
    
    - resumes
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - full_name (text)
      - title (text)
      - location (text)
      - experience (text)
      - skills (text[])
      - education (text)
      - about (text)
      - salary (text)
      - contact (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  is_employer boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create vacancies table
CREATE TABLE IF NOT EXISTS vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  salary text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL,
  employer_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  category text NOT NULL,
  work_type text NOT NULL
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  full_name text NOT NULL,
  title text NOT NULL,
  location text NOT NULL,
  experience text NOT NULL,
  skills text[] NOT NULL,
  education text NOT NULL,
  about text NOT NULL,
  salary text NOT NULL,
  contact text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" 
  ON users 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Employers can create vacancies" 
  ON vacancies 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = employer_id AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND is_employer = true
  ));

CREATE POLICY "Anyone can read vacancies" 
  ON vacancies 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can create own resumes" 
  ON resumes 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read resumes" 
  ON resumes 
  FOR SELECT 
  TO authenticated 
  USING (true);