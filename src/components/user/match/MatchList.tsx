"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";
import NotFound from "@/components/common/NotFound";

// Define User type
interface User {
  id: string;
  name: string;
  image: string | null;
  gender: string;
  matchedInterests: string[];
  matchPercentage: string;
}

const getMatchColor = (percentage: number) => {
  if (percentage === 100) return "bg-green-100 text-green-700";
  if (percentage === 0) return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
};

interface UserCardProps {
  user: User;
}

const UserSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-3">
        <Avatar>
          <AvatarFallback>
            <Skeleton className="w-12 h-12 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex flex-wrap gap-2">
        <Skeleton className="h-5 w-10 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded" />
      </CardFooter>
    </Card>
  );
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const initials = user.name[0];

  const matchPercentageNum = parseFloat(user.matchPercentage);
  const matchColor = getMatchColor(matchPercentageNum);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex items-center space-x-3">
        <Avatar>
          {user.image ? (
            <img src={user.image} alt={user?.name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-text-secondary">{user.gender}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {user.matchedInterests.map((interest, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${matchColor}`}
        >
          <Heart className="w-4 h-4" />
          <span className="text-xs font-medium">{user.matchPercentage}%</span>
        </div>
        <Link href={`/profile/${user.id}`} target="_blank">
          <Button size="sm" variant="default">
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const MatchList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const usersList = await axios.get("/api/secured/users");
      setUsers(usersList.data);
      setLoading(false);
      const resLen = usersList.data.length;
      document.title = resLen
        ? `(${resLen}) Match${resLen > 1 ? "es" : ""} found - SkillSwap`
        : "No Matches Found - SkillSwap";
    };
    getUsers();
  }, []);
  return (
    <div
      className={`${(loading || users.length > 0) &&
        " p-2 md:p-6 lg:p-20  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center"
        }`}
    >
      {!loading ? (
        users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <NotFound
            title="No Matches Found"
            message="We couldn't find any users that match your skills and interests. Please check back later or update your profile to improve your match results."
          />
        )
      ) : (
        Array.from({ length: 3 }).map((_, index) => (
          <UserSkeleton key={index} />
        ))
      )}
    </div>
  );
};

export default MatchList;
