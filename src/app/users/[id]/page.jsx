import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function generateMetadata({ params }) {
  await connectDB();
  const user = await User.findById(params.id);
  return {
    title: `${user.name} - Profile`,
    description: `Details of user ${user.name}`,
  };
}

export default async function UserDetails({ params }) {
  await connectDB();
  const user = await User.findById(params.id);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        {user.image && (
          <img 
            src={user.image} 
            alt={user.name}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #0d6efd',
              marginBottom: '1.5rem'
            }}
          />
        )}
        <h1 style={{ 
          fontSize: '2.5rem',
          color: '#0d6efd',
          marginBottom: '1rem'
        }}>
          {user.name}
        </h1>
      </div>
      
      <div style={{ 
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'left'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h5 style={{ color: '#6c757d', marginBottom: '0.5rem' }}>Email Address</h5>
          <p style={{ fontSize: '1.25rem' }}>{user.email}</p>
        </div>
        
        {user.phone && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: '#6c757d', marginBottom: '0.5rem' }}>Phone Number</h5>
            <p style={{ fontSize: '1.25rem' }}>{user.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  await connectDB();
  const users = await User.find();
  return users.map(user => ({ id: user._id.toString() }));
}

export const revalidate = 60;