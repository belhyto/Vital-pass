import VideoThumb from '@/public/images/hero-image-01.jpg'
import ModalVideo from '@/components/modal-video'
import Link from 'next/link'

export default function Hero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">

          {/* Zoomed and scaled video */}
          <video
            className="w-full h-full object-cover transform scale-125" // Zoom the video in
            src="/videos/video.mp4" // Replace with the path to your video
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div> {/* 50% opacity overlay */}
        </div>

        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16 z-10">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4 text-white" data-aos="fade-up">Vital-Pass</h1> {/* Text color adjusted for contrast */}
            <p className="text-xl text-gray-100 mb-8" data-aos="fade-up" data-aos-delay="200">All In One Health Examiner.</p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                 <Link href="/signup"
                className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0">Get Started</Link>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
