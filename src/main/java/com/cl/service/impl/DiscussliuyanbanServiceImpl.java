package com.cl.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cl.utils.PageUtils;
import com.cl.utils.Query;


import com.cl.dao.DiscussliuyanbanDao;
import com.cl.entity.DiscussliuyanbanEntity;
import com.cl.service.DiscussliuyanbanService;
import com.cl.entity.view.DiscussliuyanbanView;

@Service("discussliuyanbanService")
public class DiscussliuyanbanServiceImpl extends ServiceImpl<DiscussliuyanbanDao, DiscussliuyanbanEntity> implements DiscussliuyanbanService {
	
	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<DiscussliuyanbanEntity> page = this.selectPage(
                new Query<DiscussliuyanbanEntity>(params).getPage(),
                new EntityWrapper<DiscussliuyanbanEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<DiscussliuyanbanEntity> wrapper) {
		  Page<DiscussliuyanbanView> page =new Query<DiscussliuyanbanView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<DiscussliuyanbanView> selectListView(Wrapper<DiscussliuyanbanEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public DiscussliuyanbanView selectView(Wrapper<DiscussliuyanbanEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
