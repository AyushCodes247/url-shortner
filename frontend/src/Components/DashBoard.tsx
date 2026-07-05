import { motion } from "motion/react";

import DashNav from "./DashBoard/DashNav";
import VerifyEmailBanner from "./DashBoard/VerifyEmailBanner";
import ProfileCard from "./DashBoard/ProfileCard";
import CreateUrlCard from "./DashBoard/CreateUrlCard";
import SearchUrl from "./DashBoard/SearchUrl";
import UrlCard from "./DashBoard/UrlCard";
import EmptyState from "./DashBoard/EmptyState";
import LoadingSkeleton from "./DashBoard/LoadingSkeleton";

const DashBoard = () => {
  document.title = "MicroLink | Dashboard";

  // TODO: Replace with API
  const isVerified = false;
  const isLoading = false;

  const urls = [
    {
      urlId: "c6bc5fd2-b7f6-4d89-9f45-26fd0d7b6a91",
      title: "Portfolio",
      shortCode: "Ayush01",
      shortUrl: "https://mlk.in/Ayush01",
      originalUrl: "https://myportfolio.com",
      clickCount: 153,
      shareCount: 27,
      isActive: true,
    },
  ];

  const createUrlHandler = async (data: {
    title: string;
    customAlias: string;
    originalUrl: string;
  }) => {
    console.log(data);
  };

  const searchHandler = async (data: { urlId: string }) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(circle_at_top,rgba(37,99,235,.12),transparent_60%)] text-white">
      <DashNav
        name="Ayush Sharma"
        email="ayush@gmail.com"
      />

      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="space-y-8">
          {/* Verify Email */}

          {!isVerified && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <VerifyEmailBanner />
            </motion.div>
          )}

          {/* Profile */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <ProfileCard
              name="Ayush Sharma"
              email="ayush@gmail.com"
              totalUrls={14}
              totalClicks={893}
              totalShares={145}
            />
          </motion.div>

          {/* Create URL */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CreateUrlCard onSubmit={createUrlHandler} />
          </motion.div>

          {/* Search */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <SearchUrl onSubmit={searchHandler} />
          </motion.div>

          {/* URL Collection */}

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Your URLs
              </h2>

              {!isLoading && urls.length > 0 && (
                <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1 text-sm text-zinc-400">
                  {urls.length} URL{urls.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : urls.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {urls.map((url) => (
                  <UrlCard
                    key={url.urlId}
                    url={url}
                    onCopy={(shortUrl) =>
                      navigator.clipboard.writeText(shortUrl)
                    }
                    onEdit={(urlId) => console.log("Edit:", urlId)}
                    onDelete={(urlId) => console.log("Delete:", urlId)}
                  />
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;