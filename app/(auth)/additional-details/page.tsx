'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function AdditionalDetails() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [hasHealthConditions, setHasHealthConditions] = useState<boolean | null>(null);
  const [medications, setMedications] = useState('');
  const [hasMedications, setHasMedications] = useState<boolean | null>(null);
  const [surgeries, setSurgeries] = useState('');
  const [hasSurgeries, setHasSurgeries] = useState<boolean | null>(null);
  const [allergies, setAllergies] = useState('');
  const [hasAllergies, setHasAllergies] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        // If no user is signed in, redirect to sign-in page
        router.push('/signin');
      } else {
        // Check if user already has additional details
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().dateOfBirth) {
          // If user already has additional details, redirect to dashboard
          router.push('/dashboard');
        }
      }
    };

    checkUserAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = auth.currentUser;

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          dateOfBirth,
          gender,
          healthConditions: hasHealthConditions ? healthConditions : 'None',
          medications: hasMedications ? medications : 'None',
          surgeries: hasSurgeries ? surgeries : 'None',
          allergies: hasAllergies ? allergies : 'None',
          lastUpdated: serverTimestamp(),
        }, { merge: true });

        console.log('User details updated successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error updating user details:', error);
        setError('Failed to update user details. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('No user is signed in. Please sign in and try again.');
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Additional Information</h1>
            <p className="text-xl text-gray-400">Please provide some more details about yourself.</p>
          </div>
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="date-of-birth">Date of Birth</label>
                  <input
                    id="date-of-birth"
                    type="date"
                    className="form-input w-full text-gray-300"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    className="form-select w-full text-gray-300"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Known Health Conditions</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="health-conditions-yes"
                      name="hasHealthConditions"
                      className="mr-2"
                      checked={hasHealthConditions === true}
                      onChange={() => setHasHealthConditions(true)}
                    />
                    <label htmlFor="health-conditions-yes" className="text-gray-300 mr-4">Yes</label>
                    <input
                      type="radio"
                      id="health-conditions-no"
                      name="hasHealthConditions"
                      className="mr-2"
                      checked={hasHealthConditions === false}
                      onChange={() => setHasHealthConditions(false)}
                    />
                    <label htmlFor="health-conditions-no" className="text-gray-300">No</label>
                  </div>
                  {hasHealthConditions && (
                    <textarea
                      id="health-conditions"
                      className="form-textarea w-full text-gray-300"
                      rows={3}
                      placeholder="List any known health conditions"
                      value={healthConditions}
                      onChange={(e) => setHealthConditions(e.target.value)}
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Current Medications</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="medications-yes"
                      name="hasMedications"
                      className="mr-2"
                      checked={hasMedications === true}
                      onChange={() => setHasMedications(true)}
                    />
                    <label htmlFor="medications-yes" className="text-gray-300 mr-4">Yes</label>
                    <input
                      type="radio"
                      id="medications-no"
                      name="hasMedications"
                      className="mr-2"
                      checked={hasMedications === false}
                      onChange={() => setHasMedications(false)}
                    />
                    <label htmlFor="medications-no" className="text-gray-300">No</label>
                  </div>
                  {hasMedications && (
                    <textarea
                      id="medications"
                      className="form-textarea w-full text-gray-300"
                      rows={3}
                      placeholder="List any current medications"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Major Surgeries</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="surgeries-yes"
                      name="hasSurgeries"
                      className="mr-2"
                      checked={hasSurgeries === true}
                      onChange={() => setHasSurgeries(true)}
                    />
                    <label htmlFor="surgeries-yes" className="text-gray-300 mr-4">Yes</label>
                    <input
                      type="radio"
                      id="surgeries-no"
                      name="hasSurgeries"
                      className="mr-2"
                      checked={hasSurgeries === false}
                      onChange={() => setHasSurgeries(false)}
                    />
                    <label htmlFor="surgeries-no" className="text-gray-300">No</label>
                  </div>
                  {hasSurgeries && (
                    <textarea
                      id="surgeries"
                      className="form-textarea w-full text-gray-300"
                      rows={3}
                      placeholder="List any major surgeries"
                      value={surgeries}
                      onChange={(e) => setSurgeries(e.target.value)}
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Allergies</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="allergies-yes"
                      name="hasAllergies"
                      className="mr-2"
                      checked={hasAllergies === true}
                      onChange={() => setHasAllergies(true)}
                    />
                    <label htmlFor="allergies-yes" className="text-gray-300 mr-4">Yes</label>
                    <input
                      type="radio"
                      id="allergies-no"
                      name="hasAllergies"
                      className="mr-2"
                      checked={hasAllergies === false}
                      onChange={() => setHasAllergies(false)}
                    />
                    <label htmlFor="allergies-no" className="text-gray-300">No</label>
                  </div>
                  {hasAllergies && (
                    <textarea
                      id="allergies"
                      className="form-textarea w-full text-gray-300"
                      rows={3}
                      placeholder="List any allergies (e.g., to food, medications)"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                    ></textarea>
                  )}
                </div>
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button 
                    type="submit" 
                    className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}