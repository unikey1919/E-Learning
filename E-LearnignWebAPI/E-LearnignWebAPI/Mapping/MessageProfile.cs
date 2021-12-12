using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ElearningBO.E_Learning;

namespace E_LearnignWebAPI.Mapping
{
    public class MessageProfile:Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageViewModel>()
                .ForMember(dst => dst.From, opt => opt.MapFrom(x => x.FromUser.FullName))
                .ForMember(dst => dst.Room, opt => opt.MapFrom(x => x.Room.Name))
                .ForMember(dst => dst.Content, opt => opt.MapFrom(x => x.Content))
                .ForMember(dst => dst.Timestamp, opt => opt.MapFrom(x => x.TimeStamp));
            CreateMap<MessageViewModel, Message>();
        }
    }
}
