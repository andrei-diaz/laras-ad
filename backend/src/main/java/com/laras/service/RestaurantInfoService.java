package com.laras.service;

import com.laras.dto.RestaurantInfoDto;
import com.laras.entity.RestaurantInfo;
import com.laras.repository.RestaurantInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantInfoService {

    private final RestaurantInfoRepository restaurantInfoRepository;

    public RestaurantInfoDto getInfo() {
        return restaurantInfoRepository.getInfo()
                .map(this::toDto)
                .orElseGet(() -> RestaurantInfoDto.builder().build());
    }

    public RestaurantInfoDto saveInfo(RestaurantInfoDto dto) {
        RestaurantInfo info = restaurantInfoRepository.getInfo()
                .orElse(new RestaurantInfo());

        info.setAboutUs(dto.getAboutUs());
        info.setMission(dto.getMission());
        info.setValues(dto.getValues());
        info.setAddress(dto.getAddress());
        info.setLatitude(dto.getLatitude());
        info.setLongitude(dto.getLongitude());
        info.setPhone(dto.getPhone());
        info.setEmail(dto.getEmail());
        info.setWhatsapp(dto.getWhatsapp());
        info.setFacebookUrl(dto.getFacebookUrl());
        info.setInstagramUrl(dto.getInstagramUrl());
        info.setTiktokUrl(dto.getTiktokUrl());
        if (dto.getBannerImageUrl() != null)
            info.setBannerImageUrl(dto.getBannerImageUrl());
        if (dto.getLogoUrl() != null)
            info.setLogoUrl(dto.getLogoUrl());

        RestaurantInfo saved = restaurantInfoRepository.save(info);
        return toDto(saved);
    }

    private RestaurantInfoDto toDto(RestaurantInfo info) {
        return RestaurantInfoDto.builder()
                .id(info.getId())
                .aboutUs(info.getAboutUs())
                .mission(info.getMission())
                .values(info.getValues())
                .address(info.getAddress())
                .latitude(info.getLatitude())
                .longitude(info.getLongitude())
                .phone(info.getPhone())
                .email(info.getEmail())
                .whatsapp(info.getWhatsapp())
                .facebookUrl(info.getFacebookUrl())
                .instagramUrl(info.getInstagramUrl())
                .tiktokUrl(info.getTiktokUrl())
                .bannerImageUrl(info.getBannerImageUrl())
                .logoUrl(info.getLogoUrl())
                .createdAt(info.getCreatedAt())
                .updatedAt(info.getUpdatedAt())
                .build();
    }
}
